import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
// TODO: This may fail if package is split from PWA build
import { useHistory } from 'react-router-dom';
//
import { NavBar, Svg, Icon, IconButton, Dropdown, useModal } from '@ohif/ui';

function Header({ children }) {
  const { t } = useTranslation();
  const history = useHistory();
  const { show } = useModal();

  // TODO: IT SHOULD BE REFACTORED WHEN THE MODAL CONTENT IS DEFINED
  const showAboutModal = useCallback(() => {
    const modalComponent = () => (
      <div>{t('AboutModal:OHIF Viewer - About')}</div>
    );
    show({
      title: t('AboutModal:OHIF Viewer - About'),
      content: modalComponent,
    });
  }, [show, t]);

  // TODO: IT SHOULD BE REFACTORED WHEN THE MODAL CONTENT IS DEFINED
  const showPreferencesModal = useCallback(() => {
    const modalComponent = () => (
      <div>{t('UserPreferencesModal:User Preferences')}</div>
    );
    show({
      title: t('UserPreferencesModal:User Preferences'),
      content: modalComponent,
    });
  }, [show, t]);

  return (
    <NavBar className="justify-between border-b-4 border-black">
      <div className="flex justify-between flex-1">
        <div className="flex items-center">
          {/* // TODO: Should preserve filter/sort
              // Either injected service? Or context (like react router's `useLocation`?) */}
          <div
            className="inline-flex items-center mr-3"
            onClick={() => history.push('/')}
          >
            <Icon
              name="chevron-left"
              className="w-8 cursor-pointer text-primary-active"
            />
            <div className="ml-4 cursor-pointer">
              <Svg name="logo-ohif" />
            </div>
          </div>
        </div>
        <div className="flex items-center">{children}</div>
        <div className="flex items-center">
          <span className="mr-3 text-lg text-common-light">
            {t('Header:INVESTIGATIONAL USE ONLY')}
          </span>
          <Dropdown
            showDropdownIcon={false}
            list={[
              {
                title: t('Header:About'),
                icon: 'info',
                onClick: showAboutModal,
              },
              {
                title: t('Header:Preferences'),
                icon: 'settings',
                onClick: showPreferencesModal,
              },
            ]}
          >
            <IconButton
              variant="text"
              color="inherit"
              size="initial"
              className="text-primary-active"
            >
              <Icon name="settings" />
            </IconButton>
            <IconButton
              variant="text"
              color="inherit"
              size="initial"
              className="text-primary-active"
            >
              <Icon name="chevron-down" />
            </IconButton>
          </Dropdown>
        </div>
      </div>
    </NavBar>
  );
}

Header.propTypes = {
  children: PropTypes.any.isRequired,
};

export default Header;
