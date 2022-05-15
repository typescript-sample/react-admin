import axios from 'axios';
import { HttpRequest } from 'axios-core';
import { useEffect, useState } from 'react';
import * as React from 'react';
import { pageSizes as sizes, PageSizeSelect, useMergeState } from 'react-hook-core';
import { useNavigate } from 'react-router';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { collapseAll, expandAll, Nav, sub } from 'reactx-nav';
import { options, Privilege, storage, StringMap } from 'uione';
import logo from '../assets/images/logo.png';

interface InternalState {
  pageSizes: number[];
  pageSize: number;
  isToggleSearch?: boolean;
  isToggleMenu?: boolean;
  isMenu?: boolean;
  classicMenu?: boolean;
  darkMode?: boolean;
  keyword: string;
  showProfile: string;
  forms: Privilege[];
  username?: string;
  userType?: string;
  pinnedModules: Privilege[];
}
let sysBody: HTMLElement | null | undefined;
function isTopMenu(): boolean {
  if (!sysBody) {
    sysBody = document.getElementById('sysBody');
  }
  if (sysBody) {
    if (sysBody.classList.contains('top-menu')) {
      return true;
    }
  }
  return false;
}
export const renderItem = (resource: StringMap): any => {
  const top = isTopMenu();
  if (top) {
    return (
      <><i className='material-icons'>view_list</i><span className='dropdown-item-profile'>{resource.sidebar}</span></>
    );
  } else {
    return (
      <><i className='material-icons'>credit_card</i><span className='dropdown-item-profile'>{resource.menu}</span></>
    );
  }
};
export const renderClassicMenu = (resource: StringMap): any => {
  const top = isClassicMenu();
  if (top) {
    return (
      <><i className='material-icons'>assessment</i><span className='dropdown-item-profile'>{resource.modern_menu}</span></>
    );
  } else {
    return (
      <><i className='material-icons'>credit_card</i><span className='dropdown-item-profile'>{resource.classic_menu}</span></>
    );
  }
};
function isClassicMenu(): boolean {
  if (!sysBody) {
    sysBody = document.getElementById('sysBody');
  }
  if (sysBody) {
    if (sysBody.classList.contains('classic')) {
      return true;
    }
  }
  return false;
}
function isDarkMode(): boolean {
  if (!sysBody) {
    sysBody = document.getElementById('sysBody');
  }
  if (sysBody) {
    const parent = sysBody.parentElement;
    if (parent) {
      if (parent.classList.contains('dark')) {
        return true;
      }
    }
  }
  return false;
}
export const renderMode = (resource: StringMap): any => {
  const dark = isDarkMode();
  if (dark) {
    return (
      <><i className='material-icons'>radio_button_checked</i><span className='dropdown-item-profile'>{resource.light_mode}</span></>
    );
  } else {
    return (
      <><i className='material-icons'>timelapse</i><span className='dropdown-item-profile'>{resource.dark_mode}</span></>
    );
  }
};
const initialState: InternalState = {
  pageSizes: sizes,
  pageSize: 12,
  isMenu: false,
  darkMode: false,
  keyword: '',
  showProfile: '',
  forms: [],
  username: '',
  userType: '',
  pinnedModules: []
};
// const httpRequest = new HttpRequest(axios, options);
export const LayoutComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  /*
  const { pathname } = useLocation();*/
  console.log('path:' + location.pathname);
  const [state, setState] = useMergeState<InternalState>(initialState);
  const [resource] = useState<StringMap>(storage.resource().resource());
  const [pageSize] = useState<number>(20);
  const [pageSizes] = useState<number[]>([10, 20, 40, 60, 100, 200, 400, 10000]);
  const [topClass, setTopClass] = useState('');
  console.log('user', storage.user());
  const [user, setUser] = useState(storage.user());

  useEffect(() => {
    const forms = storage.privileges();
    if (forms && forms.length > 0) {
      for (let i = 0; i <= forms.length; i++) {
        if (forms[i]) {
          forms[i].sequence = i + 1;
        }
      }
    }
    setState({ forms });

    const username = storage.username();
    const storageRole = storage.getUserType();
    if (username || storageRole) {
      setState({ username, userType: storageRole });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const clearKeyworkOnClick = () => {
    setState({
      keyword: '',
    });
  };

  const searchOnClick = () => { };
  const toggleSearch = () => {
    setState({ isToggleSearch: !state.isToggleSearch });
  };

  const toggleMenu = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setState({ isToggleMenu: !state.isToggleMenu });
  };

  function toggleProfile() {
    if (!user) {
      navigate('/signin');
    } else {
      setState({ showProfile: state.showProfile === 'show' ? '' : 'show' });
    }
  }
  const changeClassicMenu = () => {
    if (!sysBody) {
      sysBody = document.getElementById('sysBody');
    }
    if (sysBody) {
      if (sysBody.classList.contains('classic')) {
        sysBody.classList.remove('classic');
        setState({ classicMenu: true });
      } else {
        sysBody.classList.add('classic');
        setState({ classicMenu: false });
      }
    }
  };
  const changeMenu = () => {
    if (!sysBody) {
      sysBody = document.getElementById('sysBody');
    }
    if (sysBody) {
      if (sysBody.classList.contains('top-menu')) {
        sysBody.classList.remove('top-menu');
        setState({ isMenu: true });
      } else {
        sysBody.classList.add('top-menu');
        setState({ isMenu: false });
      }
    }
  };
  const changeMode = () => {
    if (!sysBody) {
      sysBody = document.getElementById('sysBody');
    }
    if (sysBody) {
      const parent = sysBody.parentElement;
      if (parent) {
        if (parent.classList.contains('dark')) {
          parent.classList.remove('dark');
          setState({ darkMode: false });
        } else {
          parent.classList.add('dark');
          setState({ darkMode: true });
        }
      }
    }
  };
  const signout = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    const request = new HttpRequest(axios, options);
    const config: any = storage.config();
    const url = config.authentication_url + '/authentication/signout/' + storage.username();
    request.get(url).catch(err => { });
    sessionStorage.removeItem('authService');
    sessionStorage.clear();
    storage.setUser(null);
    navigate('/signin');
  };

  const pin = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, index: number, m: Privilege) => {
    event.stopPropagation();
    const { forms, pinnedModules } = state;
    if (forms.find((module) => module === m)) {
      const removedModule = forms.splice(index, 1);
      pinnedModules.push(removedModule[0]);
      forms.sort((moduleA, moduleB) => sub(moduleA.sequence, moduleB.sequence));
      pinnedModules.sort((moduleA, moduleB) => sub(moduleA.sequence, moduleB.sequence));
      setState({ forms, pinnedModules });
    } else {
      const removedModule = pinnedModules.splice(index, 1);
      forms.push(removedModule[0]);
      forms.sort((moduleA, moduleB) => sub(moduleA.sequence, moduleB.sequence));
      pinnedModules.sort((moduleA, moduleB) => sub(moduleA.sequence, moduleB.sequence));
      setState({ forms, pinnedModules });
    }
  };

  useEffect(() => {
    setUser(storage.user());
  }, [storage.user()]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    const { isToggleMenu, isToggleSearch } = state;
    const topClassList = ['sidebar-parent'];
    if (isToggleMenu) {
      topClassList.push('menu-on');
    }
    if (isToggleSearch) {
      topClassList.push('search');
    }
    setTopClass(topClassList.join(' '));
  }, [state]);

  return (
    <div className={topClass}>
      <div className='top-banner'>
      <div className='logo-banner-wrapper'>
          <img src='https://jacobspradlin.files.wordpress.com/2014/10/banner-people-connected.png' alt='Banner of The Company' />
          <img src='https://jacobspradlin.files.wordpress.com/2014/10/banner-people-connected.png' className='banner-logo-title' alt='Logo of The Company' />
        </div>
      </div>
      <div className='menu sidebar'>
        <Nav className='expanded-all'
          iconClass='material-icons'
          path={location.pathname}
          pins={state.pinnedModules}
          items={state.forms}
          resource={resource}
          pin={pin}
          toggle={toggleMenu}
          expand={expandAll}
          collapse={collapseAll} />
      </div>
      <div className='page-container'>
        <div className='page-header'>
          <form>
            <div className='search-group'>
              <section>
                <button type='button' className='toggle-menu' onClick={toggleMenu} />
                <button type='button' className='toggle-search' onClick={toggleSearch} />
                <button type='button' className='close-search' onClick={toggleSearch} />
              </section>
              <div className='logo-wrapper'>
                <img className='logo' src={logo} alt='Logo of The Company' />
              </div>
              <label className='search-input'>
                <PageSizeSelect size={pageSize} sizes={pageSizes} />
                <input type='text' id='keyword' name='keyword' maxLength={1000} placeholder={resource['keyword']} />
                <button type='button' hidden={!state.keyword} className='btn-remove-text' onClick={clearKeyworkOnClick} />
                <button type='submit' className='btn-search' onClick={searchOnClick} />
              </label>
              <section className='quick-nav'>
                {/*<button type='button' className='notifications'><i className='material-icons'>notifications</i></button>
                <button type='button' className='mail'><i className='material-icons'>mail</i></button>*/}
                {location.pathname !== '/welcome' && <Link to='welcome'><i className='material-icons'>home</i></Link>}
                <div className='dropdown-menu-profile'>
                {(!user || !user.imageURL) && (
                    <i className='material-icons' onClick={toggleProfile}>
                      person
                    </i>
                  )}
                  {!user &&
                    <ul id='dropdown-basic' className={state.showProfile + ' dropdown-content-profile'}>
                      <li className='menu' onClick={changeMenu}>{renderItem(resource)}</li>
                      <li className='classic-menu' onClick={changeClassicMenu}>{renderClassicMenu(resource)}</li>
                      <hr style={{ margin: 0 }} />
                      <li onClick={changeMode}>{renderMode(resource)}</li>
                      <hr style={{ margin: 0 }} />
                      <li><i className='material-icons'>account_circle</i><Link className='dropdown-item-profile' to={'signin'} >{resource.signin}</Link></li>
                    </ul>
                  }
                  {user &&
                    <ul id='dropdown-basic' className={state.showProfile + ' dropdown-content-profile'}>
                      <li className='menu' onClick={changeMenu}>{renderItem(resource)}</li>
                      <li className='classic-menu' onClick={changeClassicMenu}>{renderClassicMenu(resource)}</li>
                      <hr style={{ margin: 0 }} />
                      <li onClick={changeMode}>{renderMode(resource)}</li>
                      <hr style={{ margin: 0 }} />
                      <li><i className='material-icons'>account_circle</i><Link className='dropdown-item-profile' to={'my-profile'} >{state.username}</Link></li>
                      {/*<li><i className='material-icons'>settings</i><Link className='dropdown-item-profile' to={'my-profile/settings'}>{resource.my_settings}</Link></li>*/}
                      <hr style={{ margin: 0 }} />
                      <li>
                        <i className='material-icons'>exit_to_app</i>
                        <button className='dropdown-item-profile' onClick={signout}>
                          {resource.button_signout}
                        </button>
                      </li>
                    </ul>
                  }
                </div>
              </section>
            </div>
          </form>
        </div>
        <div className='page-body'><Outlet /></div>
      </div>
    </div>
  );
};
export default LayoutComponent;
