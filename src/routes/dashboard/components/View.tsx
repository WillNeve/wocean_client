import React, { useContext, useState, useCallback, useEffect } from 'react'
import { UserContext } from '../../../auth';
import { ViewNameContext } from '../root';

//views
import Notes from '../views/Notes/Notes';
import Overview from '../views/Overview';
import Account from '../views/Account';

const View: React.FC = () => {
  const { user } = useContext(UserContext)
  const { viewName } = useContext(ViewNameContext);
  const [activeView, setActiveView] = useState((<></>));

  const setView = useCallback((viewName: string) => {
    if (viewName === 'notes') {
      setActiveView((<Notes />))
    } else if (viewName === 'overview') {
      setActiveView((<Overview />))
    } else if (viewName === 'account') {
      setActiveView((<Account />))
    }
  }, [setActiveView])

  useEffect(() => {
    setView(viewName)
  }, [setView, viewName])

  let formattedViewName = viewName === 'notes' ? 'all' : viewName;
  formattedViewName = formattedViewName[0].toUpperCase() + formattedViewName.substring(1);

  if (user) {
    return (
      <div className='w-3/4 flex-grow px-4 text-gray-300'>
        <div className="block top mb-4 min-[700px]:hidden">
          <h1 className='text-xl text-gray-600'>Dashboard - {formattedViewName}</h1>
          <p className='text-sm font-light text-gray-700'>Welcome, <em className='not-italic'>{user.username}</em></p>
        </div>
        {activeView}
      </div>
    )
  }
}

export default View;
