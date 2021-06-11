import { IArrayCollection, ArrayCollection } from 'enta';
import { CharacterSchema } from '../graphql/schema/CharacterSchema';
import OnlineStatus from './OnlineStatus';
import PageInfo from './PageInfo';

export default class AppState {
    public static characters: IArrayCollection<CharacterSchema> = new ArrayCollection();
    public static pageInfo: PageInfo = new PageInfo();
    public static onlineStatus: OnlineStatus = new OnlineStatus();
}
