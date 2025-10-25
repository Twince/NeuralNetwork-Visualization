export interface IPerceptronControllerProps {
    NodeHandler: INodePositionHandler;
    EdgeHandler: INdgePositionHandler;
    NodeRenderer: INodeRenderer;
    EdgeRenderer: IEdgeRenderer;
    BaseCanvas: IBasecanvas;
    ScrollEventHandler: IScrollEventHandler;
}
