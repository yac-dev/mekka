import { createContext, RefObject } from 'react';
import { NavigationProp, ParamListBase, RouteProp } from '@react-navigation/native';

type ReactionsProps = {
  route: RouteProp<ParamListBase, string> | undefined;
};

type ReactionType = {
  _id: string;
  emoji: string;
  emojiType: string;
};

type ReactionStatusType = {
  _id: string;
  post: string;
  reaction: ReactionType;
  count: number;
};

type ReactionsContextType = {
  reactionStatuses: ReactionStatusType[];
  setReactionStatuses: React.Dispatch<React.SetStateAction<ReactionStatusType[]>>;
  areReactionStatusesFetched: boolean;
  setAreReactionStatusesFetched: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ReactionsContext = createContext<ReactionsContextType>({
  reactionStatuses: [],
  setReactionStatuses: () => {},
  areReactionStatusesFetched: false,
  setAreReactionStatusesFetched: () => {},
});
