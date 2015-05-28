import cameraModule = require("camera");
import imageSourceModule = require("image-source");
import observableModule = require("data/observable");

import editViewModelBaseModule = require("../common/edit-view-model-base");
import notificationsModule = require("../../utils/notifications");
import navigationModule = require("../../utils/navigation");
import serviceModule = require("../../utils/service");
import constantsModule = require("../../utils/constants");

export class EditTaskViewModel extends editViewModelBaseModule.EditViewModelBase{
    private _project: any;
    private _picture: imageSourceModule.ImageSource;
    
    constructor(task?: any) {
        super(task);

        this.project = {
            Name: "To do"
        };
    }

    get project(): any {
        return this._project;
    }

    set project(value: any) {
        if (this._project !== value) {
            this._project = value;
            this.notifyPropertyChanged("project", value);
        }
    }

    createItem(): any {
        var item = super.createItem();
        item.DueDate = new Date();
        item.ReminderDate = new Date();

        return item;
    }

    addItem(item: any): Promise<any> {
        return serviceModule.service.createTask(item);
    }

    updateItem(item: any): Promise<any> {
        return serviceModule.service.updateTask(item);
    }

    deleteItem(item: any): Promise<any> {
        return serviceModule.service.deleteTask(item);
    }

    takePicture() {
        cameraModule.takePicture();
    }

    validate(): boolean {
        if (!this.item.Name || this.item.Name === "") {
            notificationsModule.showError("Please enter name.");
            return false;
        }

        return super.validate();
    }

    onItemDeleted(item: any) {
        super.onItemDeleted(item);
        navigationModule.goBack();
    }
}