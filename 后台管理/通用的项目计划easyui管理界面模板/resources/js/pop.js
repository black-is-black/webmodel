// 创建人：高洪涛
// 创建时间：2014-8-5
// 功能简介：显示弹出框，配合jquery使用

var popWindow = null;
var mesgWindow = null;

/*
 * 创建人：高洪涛 创建日期：2014-8-6 功能简介：显示模态窗口，要配合bootstarp使用 参数说明： titleStr：模态窗口标题显示信息内容 msg：模态窗口显示信息内容 closeCallBackEvent : 关闭窗口时回调的方法 wt:模态窗口宽度，如果为 undefined or null
 * ，则取默认宽度 ht:模态窗口高度，如果为 undefined or null ，则取默认高度 tp:模态窗口距离顶部的距离，如果为 undefined or null ，则取默认top panelStyle:面板样式
 * panel-primary，panel-success，panel-info，panel-warning，panel-danger 如果为 undefined or null ，则取 panel-default btnStyle:按钮样式
 * btn-primary，btn-success，btn-info，btn-warning，btn-danger 如果为 undefined or null ，则取 btn-default
 */

var modalWindow = null;
var modalTop = 100;
var modalWidth = 500;
var modalHeight = 50;

function showModalWindow(titleStr, msg, panelStyle, btnStyle, tp, wt, ht, closeCallBackEvent)
{

	// 设置显示信息div
	if (modalWindow == null)
	{
		modalWindow = document.createElement("div");
	}
	modalWindow.id = "div_modalWindow1";
	modalWindow.className = "modal fade bs-example-modal-lg selfModal";
	modalWindow.setAttribute("tabindex", "-1");
	modalWindow.style.zIndex = "9999";
	modalWindow.setAttribute("role", "dialog");
	modalWindow.setAttribute("aria-labelledby", "myLargeModalLabel");
	modalWindow.setAttribute("aria-hidden", "true");
	var modalHtmlStr = "";
	if (wt == undefined || wt == "")
	{
		wt = modalWidth;
	}
	if (ht == undefined || ht == "")
	{
		ht = modalHeight;
	}
	if (tp == 0 || (tp == undefined && tp == ""))
	{
		tp = modalTop;
	}
	if (panelStyle == undefined)
	{
		panelStyle = "panel-default";
	}
	else if (panelStyle == "")
	{
		panelStyle = "panel-default";
	}

	if (btnStyle == undefined)
	{
		btnStyle = "btn-default";
	}
	else if (btnStyle == "")
	{
		btnStyle = "btn-default";
	}
	tp = 100;
    var lt = 0;
    lt = ($(window).width() - wt) / 2;

	var tmpID = "Dialog_" + parseInt(Math.random() * 100);

	modalHtmlStr += " <div id=\""+  tmpID +"\" class=\"modal-dialog modal-lg\" style=\"width:" + wt + "px; top:" + tp + "px; left:" + lt + "px; display:block;margin:0\">";
	modalHtmlStr += "            <div class=\" modal-content panel " + panelStyle + "\">";
	modalHtmlStr += "                <div id=\""+  tmpID +"_heading\" class=\" panel-heading\">";
	modalHtmlStr += "                    <h3 class=\"panel-title\" id=\"myLargeModalLabel\">";
	modalHtmlStr += titleStr;
	modalHtmlStr += "                    </h3>";
	modalHtmlStr += "                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\" style=\"display:inline; margin-top:-28px;\">";
	modalHtmlStr += "                        <span aria-hidden=\"true\">&times;</span><span class=\"sr-only\">Close</span>";
	modalHtmlStr += "                    </button>";
	modalHtmlStr += "                </div>";
	modalHtmlStr += "                <div  class=\"panel-body popup_k\" style=\"height:" + ht + "px; font-size:14px;\">";
	modalHtmlStr += msg;
	modalHtmlStr += "                </div>";
	modalHtmlStr += "                <div class=\"modal-footer\" style=\"padding: 5px 20px; margin-top: 3px; text-align: right;\">";
	modalHtmlStr += "                    <button type=\"button\" class=\"btn " + btnStyle + "\" data-dismiss=\"modal\">关闭</button>";
	modalHtmlStr += "                </div>";
	modalHtmlStr += "            </div>";
	modalHtmlStr += " </div>";

	modalWindow.innerHTML = modalHtmlStr;
	document.body.appendChild(modalWindow);

	// $("#div_modalWindow").modal({ keyboard: false });
	$('#div_modalWindow1').modal('show');

	// 定义窗口关闭后事件
	$('#div_modalWindow1').on('hidden.bs.modal', function(e)
	{
		if (closeCallBackEvent != undefined && closeCallBackEvent != "")
		{
			closeCallBackEvent();
		}
	});
	$("body").css('overflow-y', 'auto');
	$("body").css('padding-right', '0');

    
$("#"+tmpID).draggable({ "handle":"#"+tmpID+ "_heading" });
}
/**
 * @方法描述：弹出普通消息
 * @param msg
 *            模态窗口显示信息内容
 * @param closeCallBackEvent :
 *            关闭窗口时回调的方法
 * @param tp
 *            模态窗口距离顶部的距离，如果为 undefined or null ，则取默认top
 * @param wt
 *            模态窗口宽度，如果为 undefined or null ，则取默认宽度
 * @param ht
 *            模态窗口高度，如果为 undefined or null ，则取默认高度
 * @param timeOut
 *            超时关闭 默认2秒 -1时不关闭
 */
function showMsg(msg, tp, wt, ht, timeOut, closeCallBackEvent)
{
	showModalWindow("系统提示", msg, 'panel-default', 'btn-default', tp, wt, ht, closeCallBackEvent)
}

/**
 * @方法描述：弹出错误消息
 * @param msg
 *            模态窗口显示信息内容
 * @param closeCallBackEvent :
 *            关闭窗口时回调的方法
 * @param tp
 *            模态窗口距离顶部的距离，如果为 undefined or null ，则取默认top
 * @param wt
 *            模态窗口宽度，如果为 undefined or null ，则取默认宽度
 * @param ht
 *            模态窗口高度，如果为 undefined or null ，则取默认高度
 * @param timeOut
 *            超时关闭 默认2秒 -1时不关闭
 */
function showErrorMsg(msg, tp, wt, ht, timeOut, closeCallBackEvent)
{
	showModalWindow("系统提示", msg, 'panel-default', 'btn-default', tp, wt, ht, closeCallBackEvent)
}
/**
 * @方法描述：隐藏弹出的消息框
 */
function hideMsg()
{
	$("body").css('overflow-y', 'auto');
	$("body").removeClass('modal-open');
	$('#div_modalWindow').modal('hide');
	if ($("#div_modalWindow").next().hasClass("modal-backdrop"))
	{
		$("#div_modalWindow").next().remove();
	}
}

var AjaxLoadingPanel = null;

/**
 * @方法描述：在ajax显示异步访问时的加载效果
 * @param eventObj :
 *            元素对象，即加载效果的面板框计算位置是的参照物
 * @param mesg :
 *            加载时显示的消息
 * @param _top :
 *            距离参照物的顶边的距离
 * @param _left :
 *            距离参照物的左边的距离
 */
function showAjaxLoading(eventObj, mesg, _top, _left)
{
	if (AjaxLoadingPanel == null)
	{
		AjaxLoadingPanel = document.createElement("div");
	}
	AjaxLoadingPanel.id = "div_ShopLoading";
	AjaxLoadingPanel.className = "showAjaxLoading";
	AjaxLoadingPanel.style.zIndex = "9000";
	AjaxLoadingPanel.style.position = "absolute";

	var modalHtmlStr = "";
	modalHtmlStr += "<img src=\"resource/images/loading2.gif\" style=\"margin-bottom: 3px;\" /><br />";
	modalHtmlStr += "<span>" + mesg + "</span>";
	AjaxLoadingPanel.innerHTML = modalHtmlStr;

	document.body.appendChild(AjaxLoadingPanel);
	if (_left != undefined && _left != "")
	{
		$("#div_ShopLoading").css("left", $(eventObj).offset().left + _left + "px");
	}
	else
	{
		$("#div_ShopLoading").css("left", $(eventObj).offset().left - 90);
	}
	if (_top != undefined && _top != "")
	{
		$("#div_ShopLoading").css("top", $(eventObj).offset().top + _top + "px");
	}
	else
	{
		$("#div_ShopLoading").css("top", $(eventObj).offset().top - 80);
	}
	$('#div_ShopLoading').css("display", "block");
	$('#div_ShopLoading').on("click", function()
	{
		hideAjaxLoading();
	});
}

/**
 * @方法描述：隐藏在ajax显示异步访问时的加载效果
 */
function hideAjaxLoading()
{
	if (AjaxLoadingPanel != null)
	{
		$('#div_ShopLoading').css("display", "none");
	}
}

var AjaxLoadingParentPanel = null;
/**
 * @方法描述：显示带有蒙版的页面加载
 * @param mesg
 *            ：加载的消息提示 如：***正在加载，请稍后……
 * @param _top
 *            ：消息框距离浏览器顶边的距离
 * @param _left ：
 *            消息框距离浏览器左边的距离
 */
function showPageLoading(mesg, _top, _left)
{
	if (AjaxLoadingPanel == null)
	{
		AjaxLoadingPanel = document.createElement("div");
	}
	AjaxLoadingPanel.id = "div_AjaxLoading";
	AjaxLoadingPanel.className = "ajaxLoading";
	AjaxLoadingPanel.style.zIndex = "9100";
	AjaxLoadingPanel.style.position = "absolute";

	if (AjaxLoadingParentPanel == null)
	{
		AjaxLoadingParentPanel = document.createElement("div");
	}
	AjaxLoadingParentPanel.id = "div_AjaxLoadingParent";
	AjaxLoadingParentPanel.className = "pageLoadingParent";
	AjaxLoadingParentPanel.style.zIndex = "9000";
	AjaxLoadingParentPanel.style.position = "absolute";
	document.body.appendChild(AjaxLoadingParentPanel);
	$('#div_AjaxLoadingParent').css("display", "block");
	$("#div_AjaxLoadingParent").css("height", $(document).height() + "px");

	var modalHtmlStr = "";
	modalHtmlStr += "<img src=\"resource/images/loading2.gif\" style=\"margin-bottom: 3px;\" /><br />";
	modalHtmlStr += "<span>" + mesg + "</span>";

	AjaxLoadingPanel.innerHTML = modalHtmlStr;

	document.body.appendChild(AjaxLoadingPanel);
	if (_left != undefined && _left != "")
	{
		$("#div_AjaxLoading").css("left", _left + "px");
	}
	else
	{
		$("#div_AjaxLoading").css("left", ($(window).width() - 200) / 2);
	}
	if (_top != undefined && _top != "")
	{
		$("#div_AjaxLoading").css("top", _top + "px");
	}
	else
	{
		$("#div_AjaxLoading").css("top", (getWindowHeight() - 74) / 2 + $(document).scrollTop());
	}
	$('#div_AjaxLoading').css("display", "block");
	$('#div_AjaxLoading').on("click", function()
	{
		hidePageLoading();
	});
	$("body").css('overflow-y', 'auto');
	$("body").css('padding-right', '0');
}

/**
 * @方法描述：隐藏显示带有蒙版的页面加载
 */
function hidePageLoading()
{
	$("body").css('overflow-y', 'auto');
	$("body").removeClass('modal-open');
	if (AjaxLoadingParentPanel != null)
	{
		$('#div_AjaxLoadingParent').css("display", "none");
		$('#div_AjaxLoading').css("display", "none");
	}
}

// ====================================== 询问模态窗口
var modalAskWindow = null;
var modalAskTop = 100;
var modalAskWidth = 500;
var modalAskHeight = 50;
/**
 * @方法描述：弹出确认框
 * @param titleStr
 *            ：确认框title名称
 * @param msg
 *            :确认消息
 * @param tp
 *            ：确认框距离浏览器顶边距离
 * @param wt
 *            ：确认框宽度
 * @param ht
 *            ：确认框高度
 * @param okCallBackEvent
 *            ：点击确定按钮的回调方法
 * @param closeCallBackEvent
 *            ：点击关闭按钮的回调方法
 * @param okParms
 *            ：确定按钮的回调方法的参数
 */
function showModalAskWindow(titleStr, msg, tp, wt, ht, okCallBackEvent, closeCallBackEvent, okParms)
{

	// 设置显示信息div
	if (modalAskWindow == null)
	{
		modalAskWindow = document.createElement("div");
	}
	modalAskWindow.id = "div_modalAskWindow";
	modalAskWindow.className = "modal fade bs-example-modal-lg";
	modalAskWindow.setAttribute("tabindex", "-1");
	modalAskWindow.style.zIndex = "9999";
	modalAskWindow.setAttribute("role", "dialog");
	modalAskWindow.setAttribute("aria-labelledby", "myLargemodalAskLabel");
	modalAskWindow.setAttribute("aria-hidden", "true");
	var modalAskHtmlStr = "";
	if (wt == undefined && wt == "")
	{
		wt = modalAskWidth;
	}
	if (ht == undefined && ht == "")
	{
		ht = modalAskHeight;
	}
	if (tp == 0 || tp == undefined || tp == "")
	{
		tp = modalAskTop;
	}

	tp = 100;

    var lt = 0;
    lt = ($(window).width() - wt) / 2;
	var panelStyle = "panel-info";

	var tmpID = "Dialog_" + parseInt(Math.random() * 100);

	modalAskHtmlStr += " <div id=\""+  tmpID +"\" class=\"modal-dialog modal-lg\" style=\"width:" + wt + "px; top:" + tp + "px; left:" + lt + "px; display:block;margin:0\">";
	modalAskHtmlStr += "            <div class=\" modal-content panel " + panelStyle + "\">";
	modalAskHtmlStr += "                <div id=\""+  tmpID +"_heading\" class=\" panel-heading\">";
	modalAskHtmlStr += "                    <h3 class=\"panel-title\">";
	modalAskHtmlStr += titleStr;
	modalAskHtmlStr += "                    </h3>";
	modalAskHtmlStr += "                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\" style=\"display:inline; margin-top:-28px;\">";
	modalAskHtmlStr += "                        <span aria-hidden=\"true\">&times;</span><span class=\"sr-only\">Close</span>";
	modalAskHtmlStr += "                    </button>";
	modalAskHtmlStr += "                </div>";
	modalAskHtmlStr += "                <div class=\"panel-body popup_k\" style=\"height:" + ht + "px; font-size:14px;\">";
	modalAskHtmlStr += msg;
	modalAskHtmlStr += "                </div>";
	modalAskHtmlStr += "                <div class=\"modal-footer\" style=\"padding: 5px 20px; margin-top: 3px; text-align: right;\">";
	modalAskHtmlStr += "                    <button id=\"btn_askModelOK\" type=\"button\" class=\"btn btn-success\" data-dismiss=\"modal\">确定</button>";

	modalAskHtmlStr += "                    <button id=\"btn_askModelClose\" type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">关闭</button>";
	modalAskHtmlStr += "                </div>";
	modalAskHtmlStr += "            </div>";
	modalAskHtmlStr += " </div>";

	modalAskWindow.innerHTML = modalAskHtmlStr;
	document.body.appendChild(modalAskWindow);

	// $("#div_modalWindow").modal({ keyboard: false });
	$('#div_modalAskWindow').modal('show');

	// 定义窗口关闭后事件
	$('#div_modalAskWindow').on('hidden.bs.modal', function(e)
	{
		if (modalAskWindow != null)
		{
			$(modalAskWindow).remove();
		}
	});

	$("#btn_askModelClose").on("click", function()
	{
		hideModalAskWindow();
		if (closeCallBackEvent != undefined && closeCallBackEvent != "")
		{
			closeCallBackEvent();
		}
		else
		{
			$('#div_modalAskWindow').modal('hide');
		}
	});

	$("#btn_askModelOK").on("click", function()
	{
		hideModalAskWindow();
		if (okCallBackEvent != undefined && okCallBackEvent != "")
		{
			if (okParms != undefined)
			{
				okCallBackEvent(okParms);
			}
			else
			{
				okCallBackEvent();
			}
		}
		else
		{
			$('#div_modalAskWindow').modal('hide');
		}
	});
	$("body").css('overflow-y', 'auto');
	$("body").css('padding-right', '0');
    
$("#"+tmpID).draggable({ "handle":"#"+tmpID+ "_heading" });
}

/**
 * @方法描述：隐藏确认框
 */
function hideModalAskWindow()
{
	$("body").css('overflow-y', 'auto');
	$('#div_modalAskWindow').modal('hide');
	if ($("#div_modalAskWindow").next().hasClass("modal-backdrop"))
	{
		$("#div_modalAskWindow").next().remove();
		$("#div_modalAskWindow").remove();
	}
}

var modalSumitLoading = null;
/**
 * @方法描述：弹出消息框，常用与表单提交时展示
 * @param titleStr :
 *            消息框title名称
 * @param msg :
 *            消息内容
 * @param tp
 *            ：消息框距离浏览器顶边距离
 * @param wt
 *            ：消息框宽度
 * @param ht
 *            ：消息框高度
 */
function showSubmitLoading(titleStr, msg, tp, wt, ht)
{

	ModelWindow.loading(msg,titleStr,wt);
/*
	return;

	// 设置显示信息div
	if (modalSumitLoading == null)
	{
		modalSumitLoading = document.createElement("div");
	}
	modalSumitLoading.id = "div_modalSumitLoading";
	modalSumitLoading.className = "modal fade bs-example-modal-lg";
	modalSumitLoading.setAttribute("tabindex", "-1");
	modalSumitLoading.style.zIndex = "9999";
	modalSumitLoading.setAttribute("role", "dialog");
	modalSumitLoading.setAttribute("aria-labelledby", "mymodalSumitLoading");
	modalSumitLoading.setAttribute("aria-hidden", "true");
	var modalAskHtmlStr = "";
	if (wt == undefined && wt == "")
	{
		wt = 700;
	}
	if (ht == undefined && ht == "")
	{
		ht = 80;
	}
	if (tp == undefined && tp == "")
	{
		tp = 0;
	}
	tp = 100;

    var lt = 0;
    lt = ($(window).width() - wt) / 2;

	var modalSumitStr = "";

	var tmpID = "Dialog_" + parseInt(Math.random() * 100);

	modalSumitStr += " <div id=\""+  tmpID +"\" class=\"modal-dialog modal-lg\" style=\"width:" + wt + "px; top:" + tp + "px; left:" + lt + "px; display:block;margin:0\">";
	modalSumitStr += "            <div class=\" modal-content panel panel-success\">";
	modalSumitStr += "                <div id=\""+  tmpID +"_heading\" class=\" panel-heading\" style='height:10px;'>";
	modalSumitStr += "                    <h3 class=\"panel-title\">";
	modalSumitStr += titleStr;
	modalSumitStr += "                    </h3>";
	modalSumitStr += "                    <button type=\"button\" class=\"close\" onclick=\"hideSumitLoading()\" data-dismiss=\"modal\" style=\"display:inline; margin-top:-28px;\">";
	modalSumitStr += "                        <span aria-hidden=\"true\">&times;</span><span class=\"sr-only\">Close</span>";
	modalSumitStr += "                    </button>";
	modalSumitStr += "                </div>";
	modalSumitStr += "                <div class=\"panel-body\" style=\"height:" + ht + "px; text-align: center; padding: 20px; padding-top: 0px; font-size: 14px; color: Gray; overflow:hidden;\">";
	modalSumitStr += "  <span style=\"color: #666; margin-left: auto; margin-right: auto; font-size:14px;margin-top:20px; padding-top:20px;\" class=\"initProLoading\"><img src=\"resources/images/loading2.gif\" style=\"margin-bottom:5px;margin-top:20px;\" /></br>"
			+ msg + "</br>如果长时间没有反应请刷新页面</span>";
	modalSumitStr += "                </div>";
	modalSumitStr += "            </div>";
	modalSumitStr += " </div>";

	modalSumitLoading.innerHTML = modalSumitStr;
	document.body.appendChild(modalSumitLoading);

	$("#div_modalSumitLoading").modal("show");
	$("body").css('overflow-y', 'auto');
	$("body").css('padding-right', '0');
    
$("#"+tmpID).draggable({ "handle":"#"+tmpID+ "_heading" });
*/
}

/**
 * @方法描述：隐藏弹出消息框
 */
function hideSubmitLoading()
{
	/*$("body").css('overflow-y', 'auto');
	$("body").removeClass('modal-open');
	$("#div_modalSumitLoading").next().remove();
	$("#div_modalSumitLoading").remove();
	$(".modal-backdrop").remove();*/
	$("#modelwindow_loading").remove();
	$(".modal-backdrop:last").remove();
}

// ================================================== 显示操作面板信息
var modalPanelWindow = null;

/**
 * @方法描述：弹出页面，常用于加载添加、修改页面
 * @param titleStr ：
 *            弹出框的title名称
 * @param msg
 *            ：加载页面时的提示
 * @param panelStyle
 *            ：bootstrap 的面板样式
 * @param tp
 *            ：弹出框距离浏览器顶边距离
 * @param wt
 *            ：弹出框宽度
 * @param ht
 *            ：弹出框高度
 */
function showModalPanelWindow(titleStr, msg, url, panelStyle, tp, wt, ht)
{
	if(url.indexOf("?")>-1)
	{
		url+="&rd=" + Math.round(Math.random() * 10000);
	}
	else
	{
		url+="?rd=" + Math.round(Math.random() * 10000);
	}
	
	// 设置显示信息div
	if (modalPanelWindow == null)
	{
		modalPanelWindow = document.createElement("div");
	}
	modalPanelWindow.id = "div_PanelWindow";
	modalPanelWindow.className = "modal fade bs-example-modal-lg";
	modalPanelWindow.setAttribute("tabindex", "-1");
	modalPanelWindow.style.zIndex = "9900";
	modalPanelWindow.setAttribute("role", "dialog");
	modalPanelWindow.setAttribute("aria-labelledby", "myPanelModel");
	modalPanelWindow.setAttribute("aria-hidden", "true");
	var modalHtmlStr = "";
	if (wt == undefined || wt == "")
	{
		wt = modalWidth;
	}
	if (ht == undefined && ht == "")
	{
		ht = modalHeight;
	}
	if (tp == 0 || (tp == undefined && tp == ""))
	{
		tp = modalTop;
	}
	if (panelStyle == undefined)
	{
		panelStyle = "panel-default";
	}
	else if (panelStyle == "")
	{
		panelStyle = "panel-default";
	}

//	tp=100;

    var lt = 0;
    lt = ($(window).width() - wt) / 2;

	var tmpID = "Dialog_" + parseInt(Math.random() * 100);

	modalHtmlStr += " <div id=\""+  tmpID +"\" class=\"modal-dialog modal-lg\" style=\"width:" + wt + "px; top:" + tp + "px; left:" + lt + "px; display:block;margin:0\">";
	modalHtmlStr += "            <div class=\" modal-content panel " + panelStyle + "\">";
	modalHtmlStr += "                <div id=\""+  tmpID +"_heading\" class=\" panel-heading\">";
	modalHtmlStr += "                    <h3 class=\"panel-title\">";
	modalHtmlStr += titleStr;
	modalHtmlStr += "                    </h3>";
	modalHtmlStr += "                    <button type=\"button\" class=\"close\" onclick=\"hideModalPanelWindow()\" style=\"display:inline; margin-top:-28px;\">";
	modalHtmlStr += "                       <span aria-hidden=\"true\">&times;</span><span class=\"sr-only\">Close</span>";
	modalHtmlStr += "                    </button>";
	modalHtmlStr += "                </div>";
	if (ht == undefined || ht == "")
	{
		modalHtmlStr += "                <div id=\"modalPanelWindowContent\" class=\"panel-body\" style=\"height:auto; \">";
	}
	else
	{
		modalHtmlStr += "                <div id=\"modalPanelWindowContent\" class=\"panel-body\" style=\"height:" + ht + "px;font-size:14px; \">";
	}
	modalHtmlStr += "<div class=\"loading_k\"><img src=\"resource/images/loading_img.gif\"/>&nbsp;&nbsp;" + msg + "</div>";
	modalHtmlStr += "                </div>";
	modalHtmlStr += "            </div>";
	modalHtmlStr += " </div>";

	modalPanelWindow.innerHTML = modalHtmlStr;
	document.body.appendChild(modalPanelWindow);
	$("#div_PanelWindow").modal('show');

	if (url != undefined && url != "")
	{
		$("#modalPanelWindowContent").load(url);
	}
	$("body").css('overflow-y', 'auto');
	$("body").css('padding-right', '0');
$("#"+tmpID).draggable({ "handle":"#"+tmpID+ "_heading" });
}

/**
 * @方法描述：
 */
function hideModalPanelWindow()
{
	$("body").css('overflow-y', 'auto');
	$("body").removeClass('modal-open');
	$('#div_PanelWindow').modal('hide');
	if ($("#div_PanelWindow").next().hasClass("modal-backdrop"))
	{
		$("#div_PanelWindow").next().remove();
	}
	$("#div_PanelWindow").remove();
}
/**
 * @方法描述：获取浏览器可视区域高度
 * @returns
 */
function getWindowHeight()
{
	var height1 = document.body.clientHeight;
	var height2 = $(window).height();
	return height1 < height2 ? height1 : height2;
}

/* 在指定DIV创建LOADING */
function ShowLoading(panelID, mesg)
{
	var maskLoading = document.createElement('div');
	var mlMesg = document.createElement('div');
	var divRelative = document.createElement('div');
	$("#" + panelID).show();
	var thisPanel = $("#" + panelID);

	var tWidth = thisPanel.width();
	var tHeight = thisPanel.height();

	/* mask_loading */
	maskLoading.className = "mask_loading";
	maskLoading.style.zIndex = "9";
	maskLoading.style.width = thisPanel.width() + "px";
	maskLoading.style.height = thisPanel.height() + "px";

	/* mlMesg */
	mlMesg.className = "ml_mesg";
	mlMesg.style.zIndex = "9";
	mlMesg.innerHTML = mesg;

	/* divRelative */
	divRelative.style.position = "relative";

	/* 载入元素 */
	divRelative.appendChild(maskLoading);
	divRelative.appendChild(mlMesg);
	thisPanel.prepend(divRelative);

	var mLeft = (tWidth - ($(mlMesg).width() + 35)) / 2;
	var mTop = (tHeight - ($(mlMesg).height() + 40)) / 2;

	// alert('tWidth='+$(mlMesg).width()+';tHeight='+$(mlMesg).height());

	mlMesg.style.top = mTop + 'px';
	mlMesg.style.left = mLeft + 'px';

}

/* 删除由上一方法创建的LOADING */
function HideLoading(panelID)
{
	var Panels = null;

	/* 删除 指定panelID/全部 */
	if (panelID)
	{
		Panels = $("#" + panelID).find(".mask_loading");
	}
	else
	{
		Panels = $(".mask_loading");
	}

	Panels.each(function()
	{
		$(this).parent().remove();
	});
}

/* 在指定DIV创建“无记录显示”提示 */
function ShowNothing(panelID, mesg)
{
	var noRecordFrame = document.createElement('div');
	var noRecord = document.createElement('div');
	var divRelative = document.createElement('div');
	var thisPanel = $("#" + panelID);
	$("#" + panelID).show();

	/* no_record_frame */
	noRecordFrame.className = "no_record_frame";
	noRecordFrame.style.zIndex = "9";
	noRecordFrame.style.width = thisPanel.width() + "px";
	noRecordFrame.style.height = thisPanel.height() + "px";

	/* no_record */
	noRecord.className = "no_record";
	noRecord.style.zIndex = "9";
	noRecord.innerHTML = '<span class="icn"></span>' + mesg;

	/* divRelative */
	divRelative.style.position = "relative";

	/* 载入元素 */
	divRelative.appendChild(noRecordFrame);
	noRecordFrame.appendChild(noRecord);
	thisPanel.prepend(divRelative);
}