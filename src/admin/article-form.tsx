import { ValueText } from 'onecore';
import * as React from 'react';
import { createModel, DispatchWithCallback, EditComponentParam, useEdit } from '../react-hook-core';
import { formatPhone } from 'ui-plus';
import { emailOnBlur, Gender, handleError, inputEdit, phoneOnBlur, Status } from 'uione';
import { getMasterData, Article, getArticleService } from './service';

interface InternalState {
  article: Article;
  titleList: ValueText[];
  positionList: ValueText[];
}

const createArticle = (): Article => {
  const article = createModel<Article>();
  return article;
};
const initialize = (id: string|null, load: (id: string|null) => void, set: DispatchWithCallback<Partial<InternalState>>) => {
  const masterDataService = getMasterData();
  Promise.all([
    masterDataService.getTitles(),
    masterDataService.getPositions()
  ]).then(values => {
    const [titleList, positionList] = values;
    set({ titleList, positionList }, () => load(id));
  }).catch(handleError);
};
const updateTitle = (title: string, article: Article, set: DispatchWithCallback<Partial<InternalState>>) => {
    article.title = title;
  set({ article });
};

const initialState: InternalState = {
    article: {} as Article,
    titleList: [],
    positionList: []
};

const param: EditComponentParam<Article, string, InternalState> = {
  createModel: createArticle,
  initialize
};
export const ArticleForm = () => {
  const refForm = React.useRef();
  const { resource, state, setState, updateState, flag, save, updatePhoneState, back } = useEdit<Article, string, InternalState>(refForm, initialState, getArticleService(), inputEdit(), param);
  const article = state.article;
  console.log('dataa:::',state);
  
  return (
    <div className='view-container'>
      <form id='articleForm' name='articleForm' model-name='article' ref={refForm as any}>
        <header>
          <button type='button' id='btnBack' name='btnBack' className='btn-back' onClick={back} />
          <h2>Edit Article</h2>
        </header>
        <div className='row'>
          <label className='col s12 m6'>
            Id
            <input
              type='text'
              id='userId'
              name='userId'
              value={article.id}
              readOnly={!flag.newMode}
              onChange={updateState}
              maxLength={20} required={true}
               />
          </label>
          <label className='col s12 m6'>
            {resource.person_title}
            <input
              type='text'
              id='title'
              name='title'
              value={article.title}
              onChange={updateState}
              maxLength={40} 
              required={true}
              placeholder={resource.person_title} />
          </label>
          <label className='col s12 m6'>
            {resource.description}
            <input
              type='text'
              id='description'
              name='description'
              value={article.description}
              onChange={updateState}
              maxLength={40} 
              required={true}
              placeholder={resource.description} />
          </label>
        </div>
        <footer>
          {!flag.readOnly &&
            <button type='submit' id='btnSave' name='btnSave' onClick={save}>
              {resource.save}
            </button>}
        </footer>
      </form>
    </div>
  );
};
