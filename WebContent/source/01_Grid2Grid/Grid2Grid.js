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
	var sourceGridStore = new Ext.data.JsonStore({
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
		ddGroup: 'targetGridDDGroup',	// 这个Grid属于的Group?
		store: sourceGridStore,
		columns: cols,
		enableDragDrop: true,		// 是GridPanel的选中行可以被拖动
		stripeRows: true,
		autoExpandColumn: 'name',
		title: 'source Grid'
	});
	
	var targetGridStore = new Ext.data.JsonStore({
		fields: fields,
		root: 'records'
	});
	// 创建目标Grid
	var targetGrid = new Ext.grid.GridPanel({
		ddGroup: 'sourceGridDDGroup',
		store: targetGridStore,
		columns: cols,
		enableDragDrop: true,
		stripeRows: true,
		autoExpandColumn: 'name',
		title: 'target Grid'
	});
	
	// 一个简单的Panel用来展示两个GridPanel
	var displayPanel = new Ext.Panel({
		width: 650,
		height: 300,
		layout: 'hbox',
		renderTo: 'panel',
		defaults: {flex: 1},	// auto stretch	自动伸展
		layoutConfig: {align: 'stretch'},
		items: [sourceGrid, targetGrid],
		bbar: ['->',{	// Fill
			text: '重置两个表格',
			handler: function() {
				// 刷新源Grid
				sourceGridStore.loadData(myData);
				// 清空目标Grid
				targetGridStore.removeAll();
			}
		}]
	});

	// used to add records to the destination store
	var blankRecord = Ext.data.Record.create(fields);
	
	/**
	 * Setup Drop Targets
	 */
	// This will be make sure we only drop to the view srcoller element
	var sourceGridDropTargetEl = sourceGrid.getView().scroller.dom;
	var sourceGridDropTarget = new Ext.dd.DropTarget(sourceGridDropTargetEl, {
		ddGroup: 'sourceGridDDGroup',
		notifyDrop: function(ddSource, e, data) {
			var records = ddSource.dragData.selections;
			Ext.each(records, ddSource.grid.store.remove, ddSource.grid.store);
			sourceGrid.store.add(records);
			sourceGrid.store.sort('name', 'ASC');
			return true;
		}
	});
	
	// This will be make sure we only drop to the view srcoller element
	var targetGridDropTargetEl = targetGrid.getView().scroller.dom;
	var targetGridDropTarget = new Ext.dd.DropTarget(targetGridDropTargetEl, {
		ddGroup: 'targetGridDDGroup',
		notifyDrop: function(ddSource, e, data) {
			var records = ddSource.dragData.selections;
			Ext.each(records, ddSource.grid.store.remove, ddSource.grid.store);
			targetGrid.store.add(records);
			targetGrid.store.sort('name', 'ASC');
			return true;
		}
	});
});