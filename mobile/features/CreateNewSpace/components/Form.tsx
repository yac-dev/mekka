import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import NameForm from './CreateNewSpace/NameForm';
import IconForm from './CreateNewSpace/IconForm';
import VisibilityForm from './CreateNewSpace/VisibilityForm';
import ContentTypeForm from './CreateNewSpace/ContentTypeForm';
import CommentForm from './CreateNewSpace/CommentForm';
import ReactionForm from './CreateNewSpace/ReactionForm';
import Description from './CreateNewSpace/DescriptionForm';

const Form = () => {
  return (
    <ScrollView>
      <NameForm />
      <IconForm />
      <VisibilityForm />
      <ContentTypeForm />
      <CommentForm />
      <ReactionForm />
      <Description />
    </ScrollView>
  );
};

export default Form;
