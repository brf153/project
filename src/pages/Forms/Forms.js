import React, { useEffect } from 'react';
import { useHistory, useParams, useLocation, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setForm } from '../../reducers/form';
import { setLoading } from '../../reducers/loading';
import { db } from '../../firebase';
import styled from 'styled-components';

import FormsNavBar from '../../components/Navbar/FormsNavBar';
import FormsEdit from './FormsEdit';
import { setProfileDropdownStatus } from '../../reducers/modal';
import SendFormModal from '../../components/Modal/SendFormModal';

const Forms = () => {
  const { formUid } = useParams();
  const { pathname } = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const { uid: userUid } = useSelector(state => state.user.userProfile);
  const isProfileDropdownOpen = useSelector(state => state.modal.isProfileDropdownOpen);
  const isSendFormModalOpen = useSelector(state => state.modal.isSendFormModalOpen);

  useEffect(() => {
    const splitPath = pathname.split('/');
    const formStatus = splitPath[splitPath.length - 1];
    const fetchFormData = async () => {
      dispatch(setLoading(true));

      const formRef = db
        .collection('forms')
        .doc(formUid)
      const result = await formRef.get();
      const formData = result.data();

      console.log("Form Data: ", formData)

      if (formData === undefined) {
        alert('The form does not exist.');
        history.push('/forms/');
      } else if (formData.creatorUid !== userUid) {
        alert('Unauthorized Access: You are not the creator of the form');
        history.push('/forms/');
      } else {
        dispatch(setForm(formData));
      }

      dispatch(setLoading(false));
    }

    if (formUid === '') {
      history.push('/forms');
    } else if (formStatus !== 'edit' && formStatus !== 'response') {
      history.push(`/forms/${formUid}/edit`);
    } else {
      fetchFormData();
    }
  }, [pathname, formUid])

  const handleClickContainer = () => {
    if (isProfileDropdownOpen) {
      dispatch(setProfileDropdownStatus(false));
    }
  }

  return (
    <FormsLayout>
      <FormsNavBar/>
      <FormsContainer onClick={e => handleClickContainer()}>
        <Switch>
          <Route exact path="/forms/:formsUid/edit">
            <FormsEdit />
          </Route>
          <Route exact path="/forms/:formsUid/response">
            WIP
          </Route>
        </Switch>
      </FormsContainer>

      {/* Modal */}
      {
        isSendFormModalOpen &&
        <SendFormModal
          formUid={formUid}
        />
      }
    </FormsLayout>
  )
}

const FormsLayout = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: rgb(250,227,225);
`
const FormsContainer = styled.div`
  padding-top: 107px;
`

export default Forms