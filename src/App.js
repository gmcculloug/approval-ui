import React, { useState, useEffect } from 'react';
import { Main } from '@redhat-cloud-services/frontend-components/components/Main';
import { NotificationsPortal } from '@redhat-cloud-services/frontend-components-notifications/';
import { Routes } from './Routes';
import { AppPlaceholder } from './presentational-components/shared/loader-placeholders';
import { defaultSettings } from './helpers/shared/pagination';
import 'whatwg-fetch';
// react-int eng locale data
import { IntlProvider } from 'react-intl';

import '@redhat-cloud-services/frontend-components-notifications/index.css';
import '@redhat-cloud-services/frontend-components/index.css';
import { getRbacRoleApi } from './helpers/shared/user-login';
import UserContext from './user-context';

const App = () => {
  const [ auth, setAuth ] = useState(false);
  const [ userRoles, setUserRoles ] = useState([]);

  useEffect(() => {
    insights.chrome.init();
    Promise.all([
      insights.chrome.auth
      .getUser()
      .then(() =>
        getRbacRoleApi()
        .listRoles(defaultSettings.limit, 0, 'Approval ', 'principal')
        .then((result) => setUserRoles(result.data))
      )
    ]).then(() => setAuth(true));

    insights.chrome.identifyApp('approval');
  }, []);

  if (!auth) {
    return <AppPlaceholder />;
  }

  return (
    <IntlProvider locale="en">
      <UserContext.Provider value={ { roles: userRoles } }>
        <React.Fragment>
          <NotificationsPortal />
          <Main className="pf-u-p-0 pf-u-ml-0">
            <Routes/>
          </Main>
        </React.Fragment>
      </UserContext.Provider>
    </IntlProvider>
  );
};

export default App;
