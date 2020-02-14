/**
 * @方法描述：获取列表
 * @param _tableId：列表对应的表格ID
 * @param _url：获取列表数据的url
 * @param _isSingleSelect：是否单选
 *            true单选 false多选
 * @param _footPager：页面NEW的对象
 * @param _queryParams：分页对象
 * @param isColsThead：是否合并表头
 * 
 */
function getGridJsonList(_tableId, _url, _isSingleSelect, _footPager,
		_queryParams, _onLoadSuccess, isColsThead) {
	var footPager = _footPager;
	var _pageSize = 15;
	if (footPager.options.pageSize != 30) {
		_pageSize = footPager.options.pageSize;
	}
	var _pageNum = 1;
	if (footPager.options.pageNum > 1) {
		_pageNum = footPager.options.pageNum;
	}
	if (footPager.options.pageNum == 1) {
		footPager.ClearPage(); // 注意，每次检索数据库时，要调用此方法，否则可能造成分页位置混乱
	}
	var footPage = $("#" + _tableId + "footPage");
	if (footPage.size() == 0) {
		var footPageHtml = "<div id=\"" + _tableId
				+ "footPage\" class=\"foot-page\"></div>";
		$("#" + _tableId).after(footPageHtml);
	}

	// JYC 2014 12 27 第列添加编号
	var firstobj = $("#" + _tableId)
			.find("thead:first-child>tr>th:first-child");
	if ($(firstobj).attr("name") != 'dgno') {
		if (isColsThead) {
			$(firstobj)
					.before(
							"<th rowspan=\"2\" name='dgno' data-options=\"field:'dgno',align:'Center',width:42\">序号</th>");
		} else {
			$(firstobj)
					.before(
							"<th  name='dgno' data-options=\"field:'dgno',align:'Center',width:42\">序号</th>");
		}
	}
	$("#" + _tableId).datagrid(
			{
				url : _url,
				method : 'post',
				queryParams : _queryParams(), // 初始化查询条件对象
				autoRowHeight : false,
				iconCls : 'icon-edit', // 图标
				loadMsg : '请稍候，正在加载数据...',
				rownumbers : false, // 行号
				nowrap : false,
				// striped : false,
				border : false,
				fit : false, // 自动大小
				singleSelect : _isSingleSelect, // 是否可以多选行
				pagination : false, // 分页
				pageSize : _pageSize,
				pageNumber : _pageNum,
				fitColumns : true,
				method : 'post',
				view : myview,
				scrollbarSize:0,
				loadFilter : function(data) {
					var copts = $(this).datagrid('getColumnOption', 'dgno');
					for (var i = 0; i < data.rows.length; i++) {
						if (copts != null) {
							// 计算编号
							var tempIndex = (footPager.options.pageNum - 1)
									* footPager.options.pageSize;
							data.rows[i]["dgno"] = i + tempIndex + 1;
						}
						for ( var att in data.rows[i]) {
							if (data.rows[i][att] == null) {
								data.rows[i][att] = "";
							}
						}
					}
					return data;
				},
				onBeforeLoad : function(param) {

					footPager.options.pageSize = _pageSize;
					param.pageSize = footPager.options.pageSize;
					param.pageNum = footPager.options.pageNum;

					/*
					 * $(this).find(".datagrid-header-rownumber").html('&nbsp;&nbsp;序号');
					 * $(this).find(".datagrid-header-rownumber").css({
					 * 'taxt-align' : 'left' });
					 * $(this).find(".datagrid-cell-rownumber").css({ 'width' :
					 * '40px' });
					 * $(this).find(".datagrid-header-rownumber").css({ 'width' :
					 * '40px' });
					 */

				},
				onLoadSuccess : function(data) {
					// 设置总记录数
					footPager.options.total = data.total;
					footPager.options.dataPanelID = _tableId;
					footPager.options.queryParams = _queryParams;
					footPager.InitPager(_tableId + "footPage", "right");
					// var tempIndex = (footPager.options.pageNum - 1) *
					// footPager.options.pageSize;
					/*
					 * $(this).parent().find(".datagrid-cell-rownumber").each(function() {
					 * var rowIndex = tempIndex + parseInt($(this).text());
					 * $(this).text(rowIndex); });
					 */
					/*
					 * $(this).parent().find(".datagrid-header-rownumber").html('&nbsp;&nbsp;序号');
					 * $(this).parent().find(".datagrid-header-rownumber").css({
					 * 'taxt-align' : 'left' });
					 * $(this).parent().find(".datagrid-cell-rownumber").css({
					 * 'width' : '40px' });
					 * $(this).parent().find(".datagrid-header-rownumber").css({
					 * 'width' : '40px' });
					 */
					$(this).parent().find('.datagrid-body').height("auto");
					$(this).parent().find('.datagrid-body').css("overflow-y",
							"hidden");
					// jyc 2014-12-4 列头全部剧中
					// $(this).parent().find('.datagrid-htable
					// div').css("text-align", "left");
					$(this).parent().find(
							'.datagrid-htable div.datagrid-cell-c1-dgno').css(
							"text-align", "center");
					// window.setTimeout(scrollToSelect, 500);
					if (_onLoadSuccess) {
						_onLoadSuccess(data);
					}
					$('.toggle-tooltip').tooltip({
						position : 'top'
					});
				},
				rowStyler : function(index, row) {
					// if (idField != '-1' && idField != '' && idField)
					// {
					// if (eval("row." + idField) == selectId)
					// {
					// selectIndex = index;
					// window.setTimeout(function()
					// {
					// $('#' + _tableId).datagrid('checkRow', index);
					// }, 200);
					// }
					// }
				}
			});
	$(window).on("resize", function() {
		$("#" + _tableId).datagrid('resize', {
			width : datagridResizeWidth
		});
	});
}
/*
 * 没有查询到记录提示
 */
var myview = $
		.extend(
				{},
				$.fn.datagrid.defaults.view,
				{
					onAfterRender : function(target) {
						$.fn.datagrid.defaults.view.onAfterRender.call(this,
								target);
						var opts = $(target).datagrid('options');
						var vc = $(target).datagrid('getPanel');// .children('div.datagrid-view');
						vc.children('div.datagrid-empty').remove();
						if (!$(target).datagrid('getRows').length) {
							var emptyMsgHtml = "<table width='100%'>";
							emptyMsgHtml += "		<tr>";
							emptyMsgHtml += "			<td style='vertical-align: middle;color:gray;'>";
							emptyMsgHtml += "				<div class='no_record'><span class='icn'></span>没有任何相关记录</div>";
							emptyMsgHtml += "			</td>";
							emptyMsgHtml += "		</tr>";
							emptyMsgHtml += "</table>";
							var d = $(
									"<div class='datagrid-empty' style='height:70px;margin-top:80px;text-align: center;border:0px solid black;' ></div>")
									.html(emptyMsgHtml).appendTo(vc);

							// var d = $('<div class="datagrid-empty"
							// ></div>').html(opts.emptyMsg).appendTo(vc);
							/*
							 * d.css({ position : 'absolute', left : 0, top :
							 * 60, width : '100%', textAlign : 'center' });
							 */
							$(vc).css("height", 150);
						} else {
							$(vc).css("height", "auto");
						}
					}
				});
/**
 * 搜索
 * 
 * @param tableId
 * @param tableParams
 * @param isClearPage
 */
function search_btn_OnClick(tableId, tableParams, isClearPage) {
	if (footPager != null && (isClearPage == null || isClearPage == true)) {
		footPager.ClearPage();
	}
	$('#' + tableId).datagrid('load', tableParams());
	$('.datagrid-body').height("auto");
	$('.datagrid-body').css("overflow-y", "hidden");
}

// 给查询条件输入框绑定onkeypress="tbx_OnKeyPressCallBack(this);"增加此方法 按回车则进行查询
function tbx_OnKeyPressCallBack(ev, callBackFunction) {
	var objEvt = $._data($(ev)[0], "events");
	if (objEvt && objEvt["keyup"]) {
		/*
		 * 修改人：强当安 修改时间：2015-12-21
		 * 已经绑定了keyup事件就不要再重复绑定，否则回多次执行keyup事件，导致后台查询执行多次。
		 */
	} else {
		$(ev).keyup(function(e) {
			if (window.event) {
				e = window.event;
			}
			if (e.keyCode == 13) {
				if (callBackFunction) {
					callBackFunction();
				}
			}
		});
	}

}
// 给查询条件下拉绑定onchange="cmb_ChangeCallBack();"增加此方法 下拉选择后进行查询
function cmb_ChangeCallBack(ev, callBackFunction) {
	if (callBackFunction) {
		callBackFunction();
	}
}

/**
 * 加载页面
 * 
 * @param url
 *            页面路径
 */
function loadPageByForm(url) {
	var form = $("#frm_load");
	if (form.size() == 0) {
		form = $("<form></form>");
		form.attr('method', 'post');
		form.appendTo("body");
	}
	if (url.indexOf("?") > -1) {
		var paraArr = getURLParameterArray(url);
		if (paraArr != null) {
			for (var i = 0; i < paraArr.length; i++) {
				var eValue = paraArr[i].substr(paraArr[i].indexOf("=") + 1);
				var eName = paraArr[i].substr(0, paraArr[i].indexOf("="));
				if (eName != null) {
					form.append("<input type='hidden' name='" + eName
							+ "' value='" + eValue + "'/>");
				}
			}
		}
		url = url.substr(0, url.indexOf("?"));
		form.attr("action", url);// 重新存放连接地址

	} else {
		form.attr("action", url);// 重新存放连接地址
	}

	if (url != "") {
		showSubmitLoading("提示信息", "正在加载数据，请稍后", 10, 500, 100);// 显示 提交 提示
		form.append("<input type='hidden' name='moKuaiId' value='" + _moKuaiId
				+ "'/>");
		form.append("<input type='hidden' name='jieDianId' value='"
				+ _jieDianId + "'/>");
		form.submit();// 提交表单 刷新页面
	}
}
/**
 * 加载页面
 * 
 * @param url
 *            页面路径
 */
function openNewPageByForm(url) {
	var form = $("#frm_load");
	if (form.size() == 0) {
		form = $("<form></form>");
		form.attr('method', 'post');
		form.attr('target', '_blank');
		form.appendTo("body");
	}
	if (url.indexOf("?") > -1) {
		var paraArr = getURLParameterArray(url);
		if (paraArr != null) {
			for (var i = 0; i < paraArr.length; i++) {
				var eValue = paraArr[i].substr(paraArr[i].indexOf("=") + 1);
				var eName = paraArr[i].substr(0, paraArr[i].indexOf("="));
				if (eName != null) {
					form.append("<input type='hidden' name='" + eName
							+ "' value='" + eValue + "'/>");
				}
			}
		}
		url = url.substr(0, url.indexOf("?"));
		form.attr("action", url);// 重新存放连接地址

	} else {
		form.attr("action", url);// 重新存放连接地址
	}

	if (url != "") {
		// showSubmitLoading("提示信息", "正在加载数据，请稍后", 10, 500, 100);// 显示 提交 提示
		form.append("<input type='hidden' name='moKuaiId' value='" + _moKuaiId
				+ "'/>");
		form.append("<input type='hidden' name='jieDianId' value='"
				+ _jieDianId + "'/>");
		form.submit();// 提交表单 刷新页面
	}
}
/*
 * 获取url参数数组 jyc
 */
function getURLParameterArray(url) {
	var params = (url.substr(url.indexOf("?") + 1)).split("&");
	return params;
}
/**
 * 初始化AJAX方法
 * 
 * @param url
 *            访问路径
 * @param data
 *            参数
 * @param async
 *            是否同步
 * @param dataType
 *            返回数据类型
 * @param successFunction
 *            执行方法
 * @param errorFunction
 *            错误执行方法
 */
function initAjax(url, data, async, dataType, successFunction, errorFunction) {
	$.ajax({
		type : 'POST',
		url : url,
		data : data,
		dataType : dataType,
		async : async,
		success : function(json) {
			if (successFunction) {
				successFunction(json);
			}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			if (errorFunction) {
				errorFunction(XMLHttpRequest, textStatus, errorThrown);
			} else {
				ModelWindow.msgbox('网络错误,请重试！', '温馨提示', null, null);
			}
		}
	});
}
// 初始化上传文件方法
function initUploadAllFile(fileId, queueID, ismulti, isAutoUpLoad, fileExt,
		fileDesc, imgPath, sizeLimit) {
	var sizeLimit = sizeLimit ? sizeLimit : 104857600;
	$("#" + queueID).next().html("<span style='color:green;'>请选择文件</span>");
	var uploads = $("#" + fileId)
			.uploadify(
					{
						'uploader' : baseUrl
								+ 'resources/uploadify/scripts/uploadify.swf',
						'script' : baseUrl + 'upload.uploadFile.action',
						'cancelImg' : baseUrl
								+ 'resources/uploadify/cancel.png',
						'buttonImg' : baseUrl
								+ (imgPath ? imgPath
										: 'resources/uploadify/select.jpg'),
						'width' : 79,
						'height' : 28,
						'folder' : 'uploads',
						'queueID' : queueID,
						'auto' : false,
						'multi' : ismulti,
						'wmode' : 'transparent',
						'sizeLimit' : sizeLimit,
						'simUploadLimit' : 1,
						'queueSizeLimit' : 1,
						'fileExt' : fileExt, // 控制可上传文件的扩展名，启用本项时需同时声明fileDesc
						'fileDesc' : fileDesc, // 出现在上传对话框中的文件类型描述
						'fileDataName' : 'file',
						'onUploadStart' : function(event, ID, fileObj,
								response, data) {
							// console.log("==onUploadStart");
						},
						'onComplete' : function(event, ID, fileObj, response,
								data) {
							var obj = eval('(' + response + ')');
							if ($('#div_UplodLoading').length > 0) {
								$('#div_UplodLoading').hide();
							}
							var uploadFileName = obj.uploadFileName;
							var subFileName = "";
							if (uploadFileName.length > 17) {
								subFileName = uploadFileName.substring(
										uploadFileName.indexOf(".") - 13,
										uploadFileName.indexOf("."))
										+ uploadFileName.substring(
												uploadFileName.indexOf("."),
												uploadFileName.length);
							} else {
								subFileName = uploadFileName;
								uploadFileName = "";
							}
							$("#" + queueID).next().html(
									"<span style='color:green;'><a href='#' title='"
											+ uploadFileName + "'>"
											+ subFileName + "</a>上传成功！</span>");
							uploadOnFileComplete(fileId, obj, ismulti);
						},
						'onOpen' : function(event, ID, fileObj, response, data) {
						},
						'onSelectOnce' : function(event, data) {
						},
						'onAllComplete' : function(event, data) {
							var sizeLimit = $("#" + fileId).uploadifySettings(
									'sizeLimit');
							// 当所有文件上传完成后的操作
							// $("#"+queueID).next().html("<span
							// style='color:green;'>上传成功！</span>");
						},
						'onSelect' : function(event, ID, fileObj, response,
								data) {
							var fileType = fileObj.type; // 上传文件的类型（后缀名）
							var fileSize = fileObj.size; // 上传文件的实际大小
							if (isAutoUpLoad) {
								if ((fileExt.indexOf(fileType) > -1 || fileExt
										.indexOf(".*") > -1)
										&& fileSize <= sizeLimit) {
									// $($("#"+queueID).parent()).hide();//隐藏上传控件
									$("#" + queueID).next().html("");
									appendUplodLoading($("#" + queueID)
											.parent().parent(), "正在上传，请稍后……",
											-30, 20);
									$("#" + fileId).uploadifyUpload();
								} else {
									$("#" + fileId).uploadifyCancel(ID);

									// 文件格式有误
									if (fileExt.indexOf(fileType) == -1) {
										if (fileExt.indexOf(";") > -1) {
											showMsg('上传文件格式不正确!格式应该为:'
													+ fileExt + ",其中一种", 1,
													470, 50, "");
										} else {
											if (fileExt.indexOf(".xls") > -1) {
												showMsg(
														'上传文件格式不正确!格式应该为:Microsoft Excel 97-2003 '
																+ fileExt, 1,
														470, 40, "");
											} else {
												showMsg('上传文件格式不正确!格式应该为:'
														+ fileExt, 1, 470, 40,
														"");
											}
										}
									} else {
										// 文件太大
										var size = parseInt(sizeLimit / 1014 / 1014);
										showMsg('超过文件上传大小限制（' + size + 'M）！',
												1, 470, 40, "");

									}

								}
							}
						},
						'onClose' : function(queueData) {
							// console.log(queueData.filesSelected+'\n'+queueData.filesQueued+'\r\n'+queueData.filesReplaced+'\r\n'+queueData.filesCancelled+'\r\n'+
							// queueData.filesErrored)
						}
					});
	return uploads;
}
var tuPianGeShu = 0;// 图片个数
// 初始化上传文件方法
function initUploadAllFile_new(fileId, queueID, ismulti, isAutoUpLoad, fileExt,
		fileDesc, imgPath, sizeLimit) {
	var sizeLimit = sizeLimit ? sizeLimit : 104857600;
	$("#" + queueID).next().html("<span style='color:green;'>请选择文件</span>");
	var uploads = $("#" + fileId)
			.uploadify(
					{
						'uploader' : baseUrl
								+ 'resources/uploadify/scripts/uploadify.swf',
						'script' : baseUrl + 'upload.uploadFile.action',
						'cancelImg' : baseUrl
								+ 'resources/uploadify/cancel.png',
						'buttonImg' : baseUrl
								+ (imgPath ? imgPath
										: 'resources/uploadify/select.jpg'),
						'width' : 79,
						'height' : 28,
						'folder' : 'uploads',
						'queueID' : queueID,
						'auto' : false,
						'multi' : ismulti,
						'wmode' : 'transparent',
						'sizeLimit' : sizeLimit,
						'simUploadLimit' : 1,
						'queueSizeLimit' : 999,
						'fileExt' : fileExt, // 控制可上传文件的扩展名，启用本项时需同时声明fileDesc
						'fileDesc' : fileDesc, // 出现在上传对话框中的文件类型描述
						'fileDataName' : 'file',
						'onUploadStart' : function(event, ID, fileObj,
								response, data) {
							// console.log("==onUploadStart");
						},
						'onComplete' : function(event, ID, fileObj, response,
								data) {
							var obj = eval('(' + response + ')');
							if ($('#div_UplodLoading').length > 0) {
								$('#div_UplodLoading').hide();
							}
							// console.log(response);
							var uploadFileName = obj.uploadFileName;
							var subFileName = "";
							if (uploadFileName.length > 17) {
								subFileName = uploadFileName.substring(
										uploadFileName.indexOf(".") - 13,
										uploadFileName.indexOf("."))
										+ uploadFileName.substring(
												uploadFileName.indexOf("."),
												uploadFileName.length);
							} else {
								subFileName = uploadFileName;
								uploadFileName = "";
							}
							var html = "";
							html += $("#" + queueID).html();
							if (!isTuPian(obj.filePath)) {
								html += " <div style='clear:both;'>";
								html += " </div><div>";
								html += "<span title='" + obj.uploadFileName
										+ "' >" + subFileName + "</span>";
								html += "<input type='hidden' name='fileTypes' value='2'/>";
								html += "<a href='#' onclick='deletefu(this);' style='color:red;'><span class='glyphicon glyphicon-trash'></span></a>";
							} else {
								if (tuPianGeShu == 0) {
									html += " <div style='clear:both;'>";
								}
								tuPianGeShu++;
								html += "</div><div class='file_one'>";
								html += "<img title='" + obj.uploadFileName
										+ "' class='img1' src='" + obj.imgUrl
										+ "' />";
								html += "<a href='#' style='color:red;' onclick='deletefu(this);' ><span class='glyphicon glyphicon-remove'></span></a> ";
								html += "<input type='hidden' name='fileTypes' value='1'/>";
							}
							html += "<input type='hidden' name='filePaths' value='"
									+ obj.filePath + "'/>";
							html += "<input type='hidden' name='fileNames' value='"
									+ obj.uploadFileName + "'/>";
							html += "</div>";
							$("#" + queueID).html(html);
							uploadOnFileComplete(fileId, obj, ismulti);
						},
						'onOpen' : function(event, ID, fileObj, response, data) {
						},
						'onSelectOnce' : function(event, data) {
						},
						'onAllComplete' : function(event, data) {
							var sizeLimit = $("#" + fileId).uploadifySettings(
									'sizeLimit');
							// 当所有文件上传完成后的操作
							// $("#"+queueID).next().html("<span
							// style='color:green;'>上传成功！</span>");
						},
						'onSelect' : function(event, ID, fileObj, response,
								data) {
							var fileType = fileObj.type; // 上传文件的类型（后缀名）
							var fileSize = fileObj.size; // 上传文件的实际大小
							if (isAutoUpLoad) {
								if ((fileExt.indexOf(fileType) > -1 || fileExt
										.indexOf(".*") > -1)
										&& fileSize <= sizeLimit) {
									// $($("#"+queueID).parent()).hide();//隐藏上传控件
									$("#" + queueID).next().html("");
									appendUplodLoading($("#" + queueID)
											.parent().parent(), "正在上传，请稍后……",
											-30, 20);
									$("#" + fileId).uploadifyUpload();
								} else {
									$("#" + fileId).uploadifyCancel(ID);
									// 文件格式有误
									if (fileExt.indexOf(fileType) == -1) {
										if (fileExt.indexOf(";") > -1) {
											ModelWindow
													.msgbox(
															'上传文件格式不正确!格式应该为:'
																	+ fileExt
																	+ ',其中一种',
															'温馨提示', null, null);
											return false;
										} else {
											if (fileExt.indexOf(".xls") > -1) {
												ModelWindow.msgbox(
														'上传文件格式不正确!格式应该为:Microsoft Excel 97-2003'
																+ fileExt,
														'温馨提示', null, null);
												return false;
											} else {
												ModelWindow.msgbox(
														'上传文件格式不正确!格式应该为:'
																+ fileExt,
														'温馨提示', null, null);
												return false;
											}
										}
									} else {
										// 文件太大
										var size = parseInt(sizeLimit / 1014 / 1014);
										ModelWindow.msgbox('超过文件上传大小限制（' + size
												+ 'M）', '温馨提示', null, null);
										return false;
									}

								}
							}
						},
						'onClose' : function(queueData) {
							// console.log(queueData.filesSelected+'\n'+queueData.filesQueued+'\r\n'+queueData.filesReplaced+'\r\n'+queueData.filesCancelled+'\r\n'+
							// queueData.filesErrored)
						}
					});
	return uploads;
}
// 移除附件或者图片
function deletefu(obj) {
	$(obj).parent().remove();
}
/**
 * @方法描述：上传文件时，在指定空件内，显示正在加载中控件
 * @param eventObj :
 *            元素对象，追加对象的位置
 * @param mesg :
 *            加载时显示的消息
 * @param _top :
 *            距离参照物的顶边的距离
 * @param _left :
 *            距离参照物的左边的距离
 */
function appendUplodLoading(eventObj, mesg, _top, _left) {
	if ($('#div_UplodLoading').length > 0) {
		$('#div_UplodLoading').remove();
	}
	var uplodLoadingPanel = document.createElement("div");
	uplodLoadingPanel.id = "div_UplodLoading";
	uplodLoadingPanel.className = "showAjaxLoading";
	// uplodLoadingPanel.style.zIndex = "9000";
	// uplodLoadingPanel.style.position = "absolute";
	var modalHtmlStr = "";
	modalHtmlStr += "<img src=\"resources/images/loading2.gif\" style=\"margin-bottom: 3px;\" /><br />";
	modalHtmlStr += "<span>" + mesg + "</span>";
	uplodLoadingPanel.innerHTML = modalHtmlStr;
	// console.log($(eventObj));
	$(eventObj).append(uplodLoadingPanel);
	/*
	 * if (_left != undefined && _left != "") {
	 * $("#div_ShopLoading").css("left", $(eventObj).offset().left + _left +
	 * "px"); } else { $("#div_ShopLoading").css("left",
	 * $(eventObj).offset().left - 90); } if (_top != undefined && _top != "") {
	 * $("#div_ShopLoading").css("top", $(eventObj).offset().top + _top + "px"); }
	 * else { $("#div_ShopLoading").css("top", $(eventObj).offset().top - 80); }
	 */
	$('#div_UplodLoading').css("display", "block");
	$('#div_UplodLoading').on("click", function() {
		// hideAjaxLoading();
		$('.form-group').show();
		$('#div_UplodLoading').hide();
	});

}
/**
 * @方法描述：上传文件时，判断文件是否是图片
 * @param filepath :
 *            上传文件的路径
 */
function isTuPian(filepath) {
	var isTuPian = false;
	// 为了避免转义反斜杠出问题，这里将对其进行转换
	var re = /(\\+)/g;
	var filename = filepath.replace(re, "#");
	// 对路径字符串进行剪切截取
	var one = filename.split("#");
	// 获取数组中最后一个，即文件名
	var two = one[one.length - 1];
	// 再对文件名进行截取，以取得后缀名
	var three = two.split(".");
	// 获取截取的最后一个字符串，即为后缀名
	var last = three[three.length - 1];
	// 添加需要判断的后缀名类型
	var tp = "jpg,gif,bmp,JPG,GIF,BMP";
	// 返回符合条件的后缀名在字符串中的位置
	var rs = tp.indexOf(last);
	// 如果返回的结果大于或等于0，说明包含允许上传的文件类型
	if (rs >= 0) {
		isTuPian = true;
	}
	return isTuPian;
	

}
