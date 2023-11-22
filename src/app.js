import React from 'react';
import i18next from './i18n.js';
import './styles.css';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;

  return (
    <div className='App'>
      <div className='App-head'>
        <h1>Приложение на чистом JS</h1>
      </div>
      <div className='App-controls'>
        <button onClick={() => store.addItem()}>Добавить</button>
      </div>
      <div className='App-center'>
        <div className='List'>
          {list &&
            list.map(item => (
              <div key={item.code} className='List-item'>
                <div
                  className={'Item' + (item.selected ? ' Item_selected' : '')}
                  onClick={() => store.selectItem(item.code)}
                >
                  <div className='Item-code'>{item.code}</div>
                  <div className='Item-title'>
                    {item.title}{' '}
                    {item.selectionCount > 0 &&
                      `${i18next.t('amount', {
                        count: item.selectionCount
                      })}`}
                  </div>
                  <div className='Item-actions'>
                    <button onClick={() => store.deleteItem(item.code)}>
                      Удалить
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
