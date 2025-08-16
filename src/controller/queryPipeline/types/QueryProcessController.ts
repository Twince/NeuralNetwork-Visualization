import {
    ICanvasBase,
    IUserInputCanvas,
    IPathTrackingCanvas,
    IAlignCanvas,
    IResizeCanvas,
} from '@/view/components/userQuery/types/canvas';
import { INeuralNetworkBase } from '@/core/types/NeuralNetworkBase';
import { IDataStore } from '@/controller/types/DataStore';

export interface IQueryProcessControllerProps {
    userInputCanvas: ICanvasBase & IUserInputCanvas;
    trackingCanvas: ICanvasBase & IPathTrackingCanvas;
    alignCanvas: ICanvasBase & IAlignCanvas;
    resizeCanvas: ICanvasBase & IResizeCanvas;
    $NN: INeuralNetworkBase;
    $DS: IDataStore;
}
