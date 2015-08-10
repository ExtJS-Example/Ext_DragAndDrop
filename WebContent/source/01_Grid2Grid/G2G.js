/**
 * Ext 提供了丰富的界面效果, 其一便是拖动. 原理很简单:
 * 就是两个grid都设置支持拖拽的属性 -- enableDragDrop: true, ddGroup: 'GridDD2'
 * 然后 new Ext.dd.DropTraget, 在其notifyDrop里面写拖动的处理函数
 */
 
 Ext.onReady(function() {
 	
 	// 这一行不懂, 不明觉厉啊
 	Ext.state.Manager.setProvider(new Ext.state.CookieProvider());
 	
 	var myData = [
         	['3m Co',71.72,0.02,0.03,'9/1 12:00am'],
                ['Alcoa Inc',29.01,0.42,1.47,'9/1 12:00am'],
                ['Altria Group Inc',83.81,0.28,0.34,'9/1 12:00am'],
                ['American Express Company',52.55,0.01,0.02,'9/1 12:00am'],
                ['American International Group, Inc.',64.13,0.31,0.49,'9/1 12:00am'],
                ['AT&T Inc.',31.61,-0.48,-1.54,'9/1 12:00am'],
                ['Boeing Co.',75.43,0.53,0.71,'9/1 12:00am'],
                ['Caterpillar Inc.',67.27,0.92,1.39,'9/1 12:00am'],
                ['Citigroup, Inc.',49.37,0.02,0.04,'9/1 12:00am'],
                ['E.I. du Pont de Nemours and Company',40.48,0.51,1.28,'9/1 12:00am'],
                ['Exxon Mobil Corp',68.1,-0.43,-0.64,'9/1 12:00am'],
                ['General Electric Company',34.14,-0.08,-0.23,'9/1 12:00am'],
                ['General Motors Corporation',30.27,1.09,3.74,'9/1 12:00am'],
                ['Hewlett-Packard Co.',36.53,-0.03,-0.08,'9/1 12:00am'],
                ['Honeywell Intl Inc',38.77,0.05,0.13,'9/1 12:00am'],
                ['Intel Corporation',19.88,0.31,1.58,'9/1 12:00am'],
                ['International Business Machines',81.41,0.44,0.54,'9/1 12:00am'],
                ['Johnson & Johnson',64.72,0.06,0.09,'9/1 12:00am']
 	];
 	
 	// 自定义renderer函数: change
 	function change(val) {
 		if(val>0) {
 			return '<span style="color:green;">'+val+'</span>';
 		} else if(val<0) {
 			return '<span style="color:red;">'+val+'</span>';
 		}
 		return val;
 	}
 	
 	// 自定义renderer函数: pctChange
 	function pctChange(val) {
 		if(val>0) {
 			return '<span style="color:green;">'+val+'%</span>';
 		} else if(val<0) {
 			return '<span style="color:red;">'+val+'%</span>';
 		}
 		return val;
 	}
 	
 	var store = new Ext.data.SimpleStore({
 		fields: [
 			{name: 'company'},
 			{name: 'price', type: 'float'},
 			{name: 'change', type: 'float'},
 			{name: 'pctChange', type: 'float'},
 			{name: 'lastChange', type: 'date', dateFormat: 'n/j h:ia'}
 		]
 	});
 	store.loadData(myData);
 	
 	var grid1 = new Ext.grid.GridPanel({
 		store: store,
 		columns: [
	 		{id: 'company', header: 'Company', width: 160, sortable: true, dataIndex: 'company'},
	 		{header: 'Price', width: 75, sortable: true, dataIndex: 'price', renderer: 'usMoney'},
	 		{header: 'Change', width: 75, sortable: true, dataIndex: 'change', renderer: change},
	 		{header: '% Change', width: 75, sortable: true, dataIndex: 'pctChange', renderer: pctChange},
	 		{header: 'Last Update', width: 85, sortable: true, dataIndex: 'lastChange', renderer: Ext.util.Format.dateRenderer('m/d/Y')}
 		],
 		stripeRows: true,
 		autoExpandColumn: 'company',
 		height: 350,
 		width: 600,
 		title: 'Array Grid1',
 		// most import as follow
 		enableDragDrop: true,
 		dropConfig: {
 			appendOnly: true
 		},
 		ddGroup: 'GridDD'
 	});
 	grid1.render('grid1-example');
 	
 	
 	// grid2...........
 	var myData2 = [
 		['JP Morgan & Chase & Co',45.73,0.07,0.15,'9/1 12:00am'],
                ['McDonald\'s Corporation',36.76,0.86,2.40,'9/1 12:00am'],
                ['Merck & Co., Inc.',40.96,0.41,1.01,'9/1 12:00am'],
                ['Microsoft Corporation',25.84,0.14,0.54,'9/1 12:00am'],
                ['Pfizer Inc',27.96,0.4,1.45,'9/1 12:00am'],
                ['The Coca-Cola Company',45.07,0.26,0.58,'9/1 12:00am'],
                ['The Home Depot, Inc.',34.64,0.35,1.02,'9/1 12:00am'],
                ['The Procter & Gamble Company',61.91,0.01,0.02,'9/1 12:00am'],
                ['United Technologies Corporation',63.26,0.55,0.88,'9/1 12:00am'],
                ['Verizon Communications',35.57,0.39,1.11,'9/1 12:00am'],
                ['Wal-Mart Stores, Inc.',45.45,0.73,1.63,'9/1 12:00am']
 	];
 	
 	var store2 = new Ext.data.SimpleStore({
 		fields: [
 			{name: 'company'},
 			{name: 'price', type: 'float'},
 			{name: 'change', type: 'float'},
 			{name: 'pctChange', type: 'float'},
 			{name: 'lastChange', type: 'date', dateFormat: 'n/j h:ia'}
 		]
 	});
 	store2.loadData(myData2);
 	
 	var grid2 = new Ext.grid.GridPanel({
 		store: store2,
 		columns: [
	 		{id: 'company', header: 'Company', width: 160, sortable: true, dataIndex: 'company'},
	 		{header: 'Price', width: 75, sortable: true, dataIndex: 'price', renderer: 'usMoney'},
	 		{header: 'Change', width: 75, sortable: true, dataIndex: 'change', renderer: change},
	 		{header: '% Change', width: 75, sortable: true, dataIndex: 'pctChange', renderer: pctChange},
	 		{header: 'Last Update', width: 85, sortable: true, dataIndex: 'lastChange', renderer: Ext.util.Format.dateRenderer('m/d/Y')}
 		],
 		stripeRows: true,
 		autoExpandColumn: 'company',
 		height: 350,
 		width: 600,
 		title: 'Array Grid2',
 		// most import as follow
 		enableDragDrop: true,
 		dropConfig: {
 			appendOnly: true
 		},
 		ddGroup: 'GridDD2'
 	});
 	grid2.render('grid2-example');
 	
 	// grid1 -> grid2
 	// this is a grid DragDrop
 	var ddrow = new Ext.dd.DropTarget(grid2.getEl(), {
 		ddGroup: 'GridDD',		// data come from
 		// copy: true,
 		notifyDrop: function(dd, e, data) {
 			var rows = grid1.getSelectionModel().getSelections();
 			var count = rows.length;
 			var cindex = dd.getDragData(e).rowIndex;
 			var array = [];
 			for(var i=0; i<count; i++) {
 				var index = cindex+i;
 				array.push(index);
 			}
 			
 			store2.insert(cindex, data.selections);		// 在grid2中新增拖动列
 			grid2.getView().refresh();
 			grid2.getSelectionModel().selectRows(array);	// 选中拖动过来的列
 		}
 	});
 });

