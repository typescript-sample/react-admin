import {ValueText} from 'onecore';
import * as React from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import {DayModifiers} from 'react-day-picker/types';
import {buildId, EditComponent, HistoryProps} from 'react-onex';
import {setValue} from 'reflectx';
import {formatter} from 'ui-plus';
import {getDateFormat, handleError, initForm, inputEdit, registerEvents} from 'uione';
import {emailOnBlur, phoneOnBlur} from 'uione';
import '../../assets/css//datepicker.css';
import {context} from '../app';
import {Gender} from '../enum/Gender';
import {ModelStatus} from '../enum/ModelStatus';
import {User} from '../model/User';

interface InternalState {
  user: User;
  titleList: ValueText[];
  positionList: ValueText[];
  selectedDay: any;
}

export class UserForm extends EditComponent<User, number, HistoryProps, InternalState> {
  constructor(props) {
    super(props, context.getUserService(), inputEdit());
    this.updateDayPicker = this.updateDayPicker.bind(this);
    this.state = {
      user: this.createModel(),
      titleList: [],
      positionList: [],
      selectedDay: undefined,
    };
  }
  protected dateFormat = getDateFormat();
  private readonly masterDataService = context.getMasterDataService();

  getKeyValue(objs, key, value) {
    return objs.map(item => {
      return { value: item[key], text: item[value] };
    });
  }
  componentDidMount() {
    this.form = initForm(this.ref.current, registerEvents);
    const id = buildId<number>(this.props, this.keys);
    this.init(id);
  }
  async init(id: number) {
    Promise.all([
      this.masterDataService.getTitles(),
      this.masterDataService.getPositions()
    ]).then(values =>  {
      const [titleList, positionList] = values;
      this.setState({
        titleList,
        positionList
      }, () => this.load(id));
    }).catch(handleError);
  }
  /*
  async load(_id: number) {
    const id: any = _id;
    const com = this;
    if (id != null && id !== '') {
      try {
        this.running = true;
        if (this.loading) {
          this.loading.showLoading();
        }
        const ctx: any = {};
        const obj = await this.service.load(id, ctx);
        if (!obj) {
          com.handleNotFound(com.form);
        } else {
          com.resetState(false, obj, clone(obj));
        }
      } catch (err) {
        const data = err && err.response ? err.response : err;
        if (data) {
          const status = data.status;
          if (status == 404) {

          }
        }
        handleError(err);
      } finally {
        com.running = false;
        if (this.loading) {
          this.loading.hideLoading();
        }
      }
    } else {
      // Call service state
      const obj = this.createModel();
      this.resetState(true, obj, null);
    }
  }
*/
  loadGender(user?: User) {
    user = user === undefined ? this.state.user : user;
    if (user.title === 'Mr') {
      this.setState({ user: { ...user, gender: Gender.Male } });
    } else {
      this.setState({ user: { ...user, gender: Gender.Female } });
    }
  }

  createModel(): User {
    const user = super.createModel();
    user.status = ModelStatus.Active;
    return user;
  }

  protected updateDayPicker(day: Date, dayModifiers: DayModifiers, dayPickerInput: DayPickerInput) {
    const ctr = dayPickerInput;
    const props: any = ctr.props;
    const value = ctr.state.value;
    const input = ctr.getInput();
    const form = input.form;
    const modelName = form.getAttribute('model-name');
    const state = this.state[modelName];
    let dataField = props['data-field'];
    if (!dataField && input.parentElement.classList.contains('DayPickerInput')) {
      const label = input.parentElement.parentElement;
      dataField = label.getAttribute('data-field');
    }
    const valueSplit = value.split('/');
    const date = new Date(valueSplit[2], valueSplit[0] - 1, valueSplit[1]);

    if (props.setGlobalState) {
      const data = props.shouldBeCustomized ? this.prepareCustomData({ [dataField]: date }) : { [dataField]: date };
      props.setGlobalState({ [modelName]: { ...state, ...data } });
    } else {
      if (form) {
        if (modelName && modelName !== '') {
          if (dataField.indexOf('.') !== -1) {
            const arrSplit = dataField.split('.');
            const obj = {...state[arrSplit[0]], [arrSplit[1]]: date};
            this.setState({[modelName]: {...state, [arrSplit[0]]: obj}} as any);
          } else {
            this.setState({[modelName]: {...state, [dataField]: date}} as any);
          }
        } else {
          if (dataField.indexOf('.') > 0) {
            const split = dataField.split('.');
            const dateObj = this.state[split[0]];
            const indexdot = dataField.indexOf('.');
            const subrightdatafield = dataField.substring(indexdot, dataField.length);
            setValue(dateObj, subrightdatafield, date);
          } else {
            this.setState({[dataField]: date} as any);
          }
        }
      }
    }
  }

  render() {
    const resource = this.resource;
    const { user } = this.state;
    const { titleList, positionList } = this.state;
    return (
      <div className='view-container'>
        <form id='userForm' name='userForm' model-name='user' ref={this.ref}>
          <header>
            <button type='button' id='btnBack' name='btnBack' className='btn-back' onClick={this.back}/>
            <h2>{this.newMode ? resource.create : resource.edit} {resource.user}</h2>
          </header>
          <div className='row'>
            <label className='col s12 m6'>
              {resource.user_id}
              <input
                type='text'
                id='userId'
                name='userId'
                value={user.userId}
                readOnly={!this.newMode}
                onChange={this.updateState}
                maxLength={20} required={true}
                placeholder={resource.user_id} />
            </label>
            <label className='col s12 m6'>
              {resource.person_title}
              <select
                id='title'
                name='title'
                value={user.title}
                onChange={(e) => {
                  this.updateState(e, this.loadGender);
                }}>
                <option selected={true} value=''>{resource.please_select}</option>
                )
                  {titleList.map((item, index) => (
                  <option key={index} value={item.value}>{item.text}</option>)
                )}
              </select>
            </label>
            <label className='col s12 m6'>
              {resource.gender}
              <div className='radio-group'>
                <label>
                  <input
                    type='radio'
                    id='gender'
                    name='gender'
                    onChange={this.updateState}
                    disabled={user.title !== 'Dr'}
                    value={Gender.Male} checked={user.gender === Gender.Male} />
                  {resource.male}
                </label>
                <label>
                  <input
                    type='radio'
                    id='gender'
                    name='gender'
                    onChange={this.updateState}
                    disabled={user.title !== 'Dr'}
                    value={Gender.Female} checked={user.gender === Gender.Female} />
                  {resource.female}
                </label>
              </div>
            </label>
            <label className='col s12 m6'>
              {resource.position}
              <select
                id='position'
                name='position'
                value={user.position}
                onChange={this.updateState}>
                <option selected={true} value=''>{resource.please_select}</option>
                )
                  {positionList.map((item, index) => (
                  <option key={index} value={item.value}>{item.text}</option>)
                )}
              </select>
            </label>
            <label className='col s12 m6'>
              {resource.phone}
              <input
                type='tel'
                id='phone'
                name='phone'
                value={formatter.formatPhone(user.phone)}
                onChange={this.updatePhoneState}
                onBlur={phoneOnBlur}
                maxLength={17}
                placeholder={resource.phone} />
            </label>
            <label className='col s12 m6'>
              {resource.email}
              <input
                type='text'
                id='email'
                name='email'
                data-type='email'
                value={user.email}
                onChange={this.updateState}
                onBlur={emailOnBlur}
                maxLength={100}
                placeholder={resource.email} />
            </label>
            <div className='col s12 m6 radio-section'>
              {resource.user_activate}
              <div className='radio-group'>
                <label>
                  <input
                    type='radio'
                    id='active'
                    name='status'
                    onChange={this.updateState}
                    value={ModelStatus.Active} checked={user.status === ModelStatus.Active} />
                  {resource.yes}
                </label>
                <label>
                  <input
                    type='radio'
                    id='inactive'
                    name='status'
                    onChange={this.updateState}
                    value={ModelStatus.Inactive} checked={user.status === ModelStatus.Inactive} />
                  {resource.no}
                </label>
              </div>
            </div>
          </div>
          <footer>
            {!this.readOnly &&
              <button type='submit' id='btnSave' name='btnSave' onClick={this.saveOnClick}>
                {resource.save}
              </button>}
          </footer>
        </form>
      </div>
    );
  }
}
