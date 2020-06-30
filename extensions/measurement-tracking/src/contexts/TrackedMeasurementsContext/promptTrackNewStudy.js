const RESPONSE = {
  NO_NEVER: -1,
  CANCEL: 0,
  CREATE_REPORT: 1,
  ADD_SERIES: 2,
  SET_STUDY_AND_SERIES: 3,
};

function promptUser(UIViewportDialogService, ctx, evt) {
  const { viewportIndex, StudyInstanceUID, SeriesInstanceUID } = evt;

  return new Promise(async function(resolve, reject) {
    let promptResult = await _askTrackMeasurements(
      UIViewportDialogService,
      viewportIndex
    );

    if (promptResult === RESPONSE.SET_STUDY_AND_SERIES) {
      promptResult = await _askSaveDiscardOrCancel(
        UIViewportDialogService,
        viewportIndex
      );
    }

    // TODO: Hook into @JamesAPetts createReport
    if (promptResult === RESPONSE.CREATE_REPORT) {
      window.alert('CREATE REPORT');
    }

    resolve({
      userResponse: promptResult,
      StudyInstanceUID,
      SeriesInstanceUID,
    });
  });
}

function _askTrackMeasurements(UIViewportDialogService, viewportIndex) {
  return new Promise(function(resolve, reject) {
    const message = 'Track measurements for this series?';
    const actions = [
      { type: 'cancel', text: 'No', value: RESPONSE.CANCEL },
      {
        type: 'primary',
        text: 'Yes',
        value: RESPONSE.SET_STUDY_AND_SERIES,
      },
    ];
    const onSubmit = result => {
      UIViewportDialogService.hide();
      resolve(result);
    };

    UIViewportDialogService.show({
      viewportIndex,
      type: 'info',
      message,
      actions,
      onSubmit,
      onOutsideClick: () => {
        UIViewportDialogService.hide();
        resolve(RESPONSE.CANCEL);
      },
    });
  });
}

function _askSaveDiscardOrCancel(UIViewportDialogService, viewportIndex) {
  return new Promise(function(resolve, reject) {
    const message =
      'Measurements cannot span across multiple studies. Do you want to save your tracked measurements?';
    const actions = [
      { type: 'cancel', text: 'Cancel', value: RESPONSE.CANCEL },
      {
        type: 'secondary',
        text: 'No, discard previosuly tracked series & measurements',
        value: RESPONSE.SET_STUDY_AND_SERIES,
      },
      {
        type: 'primary',
        text: 'Yes',
        value: RESPONSE.CREATE_REPORT,
      },
    ];
    const onSubmit = result => {
      UIViewportDialogService.hide();
      resolve(result);
    };

    UIViewportDialogService.show({
      viewportIndex,
      type: 'warning',
      message,
      actions,
      onSubmit,
      onOutsideClick: () => {
        UIViewportDialogService.hide();
        resolve(RESPONSE.CANCEL);
      },
    });
  });
}

export default promptUser;
