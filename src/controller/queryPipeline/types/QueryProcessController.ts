import {
    ICanvasBase,
    IUserInputCanvas,
    IPathTrackingCanvas,
    IAlignCanvas,
    IResizeCanvas,
} from '@/view/components/userQuery/types/canvas';
import { INeuralNetworkBase } from '@/core/types/NeuralNetworkBase';

export interface IQueryProcessControllerProps {
    userInputCanvas: ICanvasBase & IUserInputCanvas;
    trackingCanvas: ICanvasBase & IPathTrackingCanvas;
    alignCanvas: ICanvasBase & IAlignCanvas;
    resizeCanvas: ICanvasBase & IResizeCanvas;
    $NN: INeuralNetworkBase;
}
