import { allActionCreators } from './../store/reducers/action-creators';
import { AppDispatch } from './../store/index';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

export const useActions = () => {
    const dispatch = useDispatch<AppDispatch>();
    return bindActionCreators(allActionCreators, dispatch);
}