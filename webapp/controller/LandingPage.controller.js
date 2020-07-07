sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/format/DateFormat",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/library",
	"sap/ui/Device"
], function (Controller, DateFormat, JSONModel, library, Device) {
	"use strict";

	//var CalendarType = coreLibrary.CalendarType;

	return Controller.extend("gdsd.PlacesofCareClaims.controller.LandingPage", {
		oFormatYyyymmdd: null,
		oModel: null,
		onInit: function () {
			this._mViewSettingsDialogs = {};

			this.oFormatYyyymmdd = DateFormat.getInstance({
				pattern: "yyyy-MM-dd",
				calendarType: "Gregorian"
			});

			this.oModel = new JSONModel({
				selectedDates:[]
			});
			this.getView().setModel(this.oModel);
		},

		handleCalendarSelect: function (oEvent) {
			var oCalendar = oEvent.getSource(),
				aSelectedDates = oCalendar.getSelectedDates(),
				oData = {
					selectedDates:[]
				},
				oDate,
				i;
			if (aSelectedDates.length > 0) {
				for (i = 0; i < aSelectedDates.length; i++) {
					oDate = aSelectedDates[i].getStartDate();
					oData.selectedDates.push({
						Date: this.oFormatYyyymmdd.format(oDate)
					});
				}
				this.oModel.setData(oData);
			} else {
				this._clearModel();
			}

		},

		handleRemoveSelection: function () {
			this.byId("calendar").removeAllSelectedDates();
			this._clearModel();
		},

		_clearModel: function () {
			var oData = {
				selectedDates: []
			};
			this.oModel.setData(oData);
		},

		createFormDialog: function (sDialogFragmentName) {

			// https://stackoverflow.com/questions/55667673/how-to-remove-duplicates-and-display-only-unique-values-in-viewsettingsitem
			var oDialog = this._mViewSettingsDialogs[sDialogFragmentName];
			if (!oDialog) {
				oDialog = sap.ui.xmlfragment(sDialogFragmentName, this);
				this._mViewSettingsDialogs[sDialogFragmentName] = oDialog;

				if (Device.system.desktop) {
					oDialog.addStyleClass("sapUiSizeCompact");
				}
			}
			return oDialog;
		},

		handleBeneficiariesButtonPressed: function () {
			this.createFormDialog("gdsd.PlacesofCareClaims.Fragments.SummaryofBeneficiaries").open();
		},

		handleRegisterButtonPressed: function () {
			this.createFormDialog("gdsd.PlacesofCareClaims.Fragments.AttendanceRegister").open();
		},

		handleStaffSummaryButtonPressed: function () {
			this.createFormDialog("gdsd.PlacesofCareClaims.Fragments.SummaryofStaff").open();
		},
		onCancel: function () {
			//Cater for the age group selected 
			var oDialogKey,
				oDialogValue;

			for (oDialogKey in this._mViewSettingsDialogs) {
				oDialogValue = this._mViewSettingsDialogs[oDialogKey];

				if (oDialogValue) {
					oDialogValue.close();
					// oDialogValue = null;
				}
			}
		},

		onAddSummaryofBeneficiariesItem: function (oEvent) {
			var oTable = this.byId("tblSummaryofBeneficiaries");
			var columnListItemNewLine = new sap.m.ColumnListItem({
				cells: [
					new sap.m.Text({
						text: sap.ui.getCore().byId("sbSurname").getValue()
					}),
					new sap.m.Text({
						text: sap.ui.getCore().byId("sbDoB").getValue()
					}),
					new sap.m.Text({
						text: sap.ui.getCore().byId("sbAge").getValue()
					})
				]
			});
			oTable.addItem(columnListItemNewLine);
			this.onCancel();
		},

		onAddRegisterItem: function (oEvent) {
			var oTable = this.byId("tblRegister");
			var columnListItemNewLine = new sap.m.ColumnListItem({
				cells: [
					new sap.m.Text({
						text: sap.ui.getCore().byId("arSurname").getValue()
					}),
					new sap.m.Text({
						text: sap.ui.getCore().byId("arAge").getValue()
					}),
					new sap.m.Text({
						text: sap.ui.getCore().byId("arAttendanceDays").getValue()
					})
				]
			});
			oTable.addItem(columnListItemNewLine);
			this.onCancel();
		},

		onAddSummaryofStaffItem: function (oEvent) {
			var oTable = this.byId("tblSummaryofStaff");
			var columnListItemNewLine = new sap.m.ColumnListItem({
				cells: [
					new sap.m.Text({
						text: sap.ui.getCore().byId("ssSurname").getValue()
					}),
					new sap.m.Text({
						text: sap.ui.getCore().byId("ssID").getValue()
					}),
					new sap.m.Text({
						text: sap.ui.getCore().byId("ssGender").getValue()
					})
				]
			});
			oTable.addItem(columnListItemNewLine);
			this.onCancel();
		}

	});
});