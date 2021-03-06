import * as _ from "lodash";
import { connect } from "react-redux";
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";

import actions from "../../actions";
import ServiceItem from "../../components/AppView/ServicesTable/ServiceItem";
import ResourceRef from "../../shared/ResourceRef";
import { IStoreState } from "../../shared/types";

interface IServiceItemContainerProps {
  serviceRef: ResourceRef;
}

function mapStateToProps({ kube }: IStoreState, props: IServiceItemContainerProps) {
  const { serviceRef } = props;
  return {
    name: serviceRef.name,
    service: kube.items[serviceRef.getResourceURL()],
  };
}

function mapDispatchToProps(
  dispatch: ThunkDispatch<IStoreState, null, Action>,
  props: IServiceItemContainerProps,
) {
  const { serviceRef } = props;
  return {
    watchService: () => dispatch(actions.kube.getAndWatchResource(serviceRef)),
    closeWatch: () => dispatch(actions.kube.closeWatchResource(serviceRef)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ServiceItem);
