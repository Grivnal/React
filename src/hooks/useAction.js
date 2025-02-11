import {bindActionCreators} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";
import actionCreator from "../store/actionCreator/actionCreator";
import {useMemo} from "react";

const useAction = () => {
    const dispatch = useDispatch();
    return useMemo(() => bindActionCreators(actionCreator, dispatch), [dispatch]);
}

export default useAction;