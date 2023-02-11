import React, { useState } from 'react';
import { useEventForm } from 'CreateEvent/CreateEventFormStore';
import { useModal } from 'ScoutDesign/library';
import Row from './Row';
import TapToEditContainer from './components/TapToEditContainer';

// Component Types
import TitleInput from './TitleInput';
import LocationInput from './LocationInput';
import DateInput from './DateInput';
import TimeInput from './TimeInput';
import DescriptionInput from './DescriptionInput';
import NumberSliderInput from './NumberSliderInput';
import OptionsInput from './OptionsInput';

const eventComponents = {
  shortText: TitleInput,
  location: LocationInput,
  date: DateInput,
  time: TimeInput,
  description: DescriptionInput,
  slider: NumberSliderInput,
  setting: OptionsInput,
};

export default ({ fieldType, id, fieldName, questionText, payload }) => {
  const { InitialButton, EditingComponent, CompletedComponent } =
    eventComponents[fieldType];

  const [{ fields }] = useEventForm();

  const [showAndroidClock, setShowAndroidClock] = useState(false);

  const { modalProps, openModal, Modal } = useModal();

  switch (fieldType) {
    case 'setting':
      return (
        <Row valid={!!fields?.[id]} key={id} fieldName={fieldName}>
          <InitialButton
            initial={
              fields?.[id] === payload?.options?.[0]
                ? 0
                : fields?.[id] === payload?.options?.[1]
                ? 1
                : -1
            }
            id={id}
            questionText={questionText}
            option1={payload?.options?.[0]}
            option2={payload?.options?.[1]}
          />
        </Row>
      );
    case 'time':
      return (
        <React.Fragment key={id}>
          <EditingComponent
            id={id}
            Modal={Modal}
            modalProps={modalProps}
            showAndroidClock={showAndroidClock}
            setShowAndroidClock={setShowAndroidClock}
            questionText={questionText}
          />
          <Row valid={!!fields?.[id]} fieldName={fieldName}>
            {!fields?.[id] ? (
              <InitialButton
                onPress={() =>
                  Platform.OS === 'ios'
                    ? openModal()
                    : setShowAndroidClock(true)
                }
                fieldName={fieldName}
              />
            ) : (
              <TapToEditContainer
                edit={() =>
                  Platform.OS === 'ios'
                    ? openModal()
                    : setShowAndroidClock(true)
                }
              >
                <CompletedComponent data={fields?.[id]} />
              </TapToEditContainer>
            )}
          </Row>
        </React.Fragment>
      );
    case 'date':
      return (
        <React.Fragment key={id}>
          <EditingComponent
            id={id}
            Modal={Modal}
            modalProps={modalProps}
            questionText={questionText}
          />
          <Row valid={!!fields?.[id]} fieldName={fieldName}>
            {!fields?.[id] ? (
              <InitialButton onPress={openModal} fieldName={fieldName} />
            ) : (
              <TapToEditContainer edit={openModal}>
                <CompletedComponent data={fields?.[id]} />
              </TapToEditContainer>
            )}
          </Row>
        </React.Fragment>
      );
    default:
      return (
        <React.Fragment key={id}>
          <EditingComponent
            id={id}
            Modal={Modal}
            modalProps={modalProps}
            questionText={questionText}
          />
          <Row valid={!!fields?.[id]} fieldName={fieldName}>
            {!fields?.[id] ? (
              <InitialButton onPress={openModal} fieldName={fieldName} />
            ) : (
              <TapToEditContainer edit={openModal}>
                <CompletedComponent data={fields?.[id]} />
              </TapToEditContainer>
            )}
          </Row>
        </React.Fragment>
      );
  }
};
