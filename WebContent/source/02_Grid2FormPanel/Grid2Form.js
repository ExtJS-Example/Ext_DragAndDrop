/**
 * 实现GridPanel和GridPanel间的拖拽
 */
Ext.onReady(function() {
	var myData = {
		records: [
			{ name : "Rec 0", column1 : "0", column2 : "0" },
			{ name : "Rec 1", column1 : "1", column2 : "1" },
			{ name : "Rec 2", column1 : "2", column2 : "2" },
			{ name : "Rec 3", column1 : "3", column2 : "3" },
			{ name : "Rec 4", column1 : "4", column2 : "4" },
			{ name : "Rec 5", column1 : "5", column2 : "5" },
			{ name : "Rec 6", column1 : "6", column2 : "6" },
			{ name : "Rec 7", column1 : "7", column2 : "7" },
			{ name : "Rec 8", column1 : "8", column2 : "8" },
			{ name : "Rec 9", column1 : "9", column2 : "9" }
		]
	};
	
	// 通用的字段数组, 可以在两个Grid的Store通用
	var fields = [
		{name: 'name', mapping : 'name'},
		{name: 'column1', mapping : 'column1'},
		{name: 'column2', mapping : 'column2'}
	];
	
	// 创建 data store
	var gridStore = new Ext.data.JsonStore({
		fields: fields,
		data: myData,
		root: 'records'
	});
	
	// Column Model 的快捷数组
	var cols = [
		{id: 'name', header: 'Record Name', width: 160, sortable: true, dataIndex: 'name'},
		{header: '行1', width: 50, sortable: true, dataIndex: 'column1'},
		{header: '行2', width: 50, sortable: true, dataIndex: 'column2'}
	];
	
	// 声明源Grid
	var sourceGrid = new Ext.grid.GridPanel({
		ddGroup: 'gridDDGroup',	// 这个Grid属于的Group?
		store: gridStore,
		columns: cols,
		enableDragDrop: true,		// 是GridPanel的选中行可以被拖动
		stripeRows: true,
		autoExpandColumn: 'name',
		width: 325,
		region: 'west',
		title: 'Data Grid',
		selModel: new Ext.grid.RowSelectionModel({singleSelect: true})
	});
	
	// 构造FormPanel
	var formPanel = new Ext.form.FormPanel({
		region: 'center',
		title: 'Generic Form Panel',
		bodyStyle: 'padding: 20px; background-color: #DFE8F6',
		labelWidth: 100,
		width: 325,
		items:[{
			xtype: 'textfield',
			fieldLabel: 'Record Name',
			name: 'name'
		}, {
			xtype: 'textfield',
			fieldLabel: 'Column 1',
			name: 'column1'
		}, {
			xtype: 'textfield',
			fieldLabel: 'Column 2',
			name: 'column2'
		}]
	});
	
	// Simple 'border layout' panel to house both components
	var displayPanel = new Ext.Panel({
		width: 650,
		height: 300,
		layout: 'border',
		renderTo: 'panel',
		items: [sourceGrid, formPanel],
		bbar: ['->', {
			text: 'Reset Example',
			handler: function(btn) {
				gridStore.loadData(myData);
				formPanel.getForm().reset();
			}
		}]
	});
	
	// This will make sure we only drop to the view container
	var formPanelDropTargetEl = formPanel.body.dom;
	var formPanelDropTarget = new Ext.dd.DropTarget(formPanelDropTargetEl, {
		ddGroup: 'gridDDGroup',
		notifyEnter: function(ddSource, e, data) {
			// Add some flare to nivite drop
			formPanel.body.stopFx();
			formPanel.body.highlight();
		},
		notifyDrop: function(ddSource, e, data) {
			// Reference the record(single selection) for readability
			var selectedRecord = ddSource.dragData.selections[0];
			
			// Load the record into the form
			formPanel.getForm().loadRecord(selectedRecord);
			
			// Delete record from the grid , not really required
			ddSource.grid.store.remove(selectedRecord);
		}
	});
	
});