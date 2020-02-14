var PageCallBackEnent = null;
function Pager(outObj)
{
	this.options = {
		pageSize : 30, // 每页显示记录数
		pageNum : 1, // 当前页码
		pageCount : undefined,
		total : 0, // 总记录数
		dataPanelID : undefined, // 数据显示控件ID
		gridPanel : undefined,// 当不用jquery-easyui grid 时，设置列表控件对象，供自定义显示等待条确定位置时使用
		queryParams : undefined,// 查询的获取参数方法
		pagerPanel : null
	// 分页控件父页面
	};

	this.startIndex = 0;
	this.endIndex = 0;
	this.pagerPanelID = "";
	this.outObj = outObj;

	this.ClearPage = function()
	{
		if (this.options.pagerPanel != null)
		{
			$(this.options.pagerPanel).html("");
		}
		this.options.pageNum = 1;
		this.options.pageCount = undefined;
		this.options.total = 0;
		this.options.dataPanelID = undefined;
		this.options.pagerPanel = null;
	}

	this.InitPager = function(pagerPanelID, align)
	{
		// 2015-1-5 翻页时还选中列头checkbox
		var herdCheckBox = $("#" + this.options.dataPanelID).parent().find(".datagrid-header-check>input[type=checkbox]");
		if (herdCheckBox.length > 0)
		{
			$(herdCheckBox[0]).attr("checked", false);
		}

		this.options.pagerPanel = $("#" + pagerPanelID);
		var pageHtmlStr = "";
		this.pagerPanelID = pagerPanelID;
		pageHtmlStr += "<div style=\"float: " + align + ";\">";
		pageHtmlStr += "    <ul>";
		// 计算共多少页 向上取整,有小数就整数部分加1
		this.options.pageCount = Math.ceil(this.options.total / this.options.pageSize);
		// this.options.pageCount = 14;
		if (this.options.pageCount <= 0)
		{
			$("#" + pagerPanelID).html("");
			return; // 如果没有数据，则返回
		}

		pageHtmlStr += "<li id=\"li_pr_" + pagerPanelID + "\" class=\"ghtao\"><a href=\"JavaScript:;\" title=\"上一页\" onClick=\"" + this.outObj + ".GoPage(" + (this.options.pageNum - 1)
				+ ")\">&laquo;</a></li>";

		// 计算当前页与第一页的距离，如果小于5 输出 1,2,3,4,5 ...max
		var tempCount = parseInt(this.options.pageNum);
		var pageCountOffset = 3; // 页面前后偏移量
		var pageCountOffsetAll = pageCountOffset * 2 + 1; // 根据页面偏移量计算出判断量

		if (this.options.pageCount > 12)
		{
			// alert("this.startIndex = " + this.startIndex + " this.endIndex=" + this.endIndex + " tempCount=" + tempCount);
			if (tempCount == this.options.pageCount)
			{
				// 判断是否点击最后一页
				this.startIndex = this.options.pageCount - pageCountOffsetAll;
				this.endIndex = this.options.pageCount;
				pageHtmlStr += this.GetPageHtml(1);
				pageHtmlStr += "<span class=\"dd\">...</span>";
				for (var i = this.startIndex; i <= this.endIndex; i++)
				{
					if (this.options.pageNum == i)
					{
						pageHtmlStr += this.GetPageHtml(i, "xz", "first");
					}
					else
					{
						pageHtmlStr += this.GetPageHtml(i);
					}
				}

			}
			else if (tempCount == 1)
			{
				// 判断是否点击第一页
				this.startIndex = 1;
				this.endIndex = pageCountOffsetAll;
				for (var i = this.startIndex; i <= this.endIndex; i++)
				{
					if (this.options.pageNum == i)
					{
						pageHtmlStr += this.GetPageHtml(i, "xz", "first");
					}
					else
					{
						pageHtmlStr += this.GetPageHtml(i);
					}
				}
				if (this.endIndex != 0 && this.endIndex < this.options.pageCount)
				{
					pageHtmlStr += "<span class=\"dd\">...</span>";
					pageHtmlStr += this.GetPageHtml(this.options.pageCount);
				}
			}
			else
			{
				// 点击其他页面逻辑
				if (this.endIndex == 0 && this.endIndex < (tempCount + pageCountOffsetAll - 1))
				{
					// 当第一次点击时，判断结束页面是否小于当前面加上偏移量，如果小于则 开始 = 当前，结束=当前+偏移
					this.startIndex = tempCount;
					this.endIndex = tempCount + pageCountOffsetAll - 1;

				}
				else if (this.endIndex > 0 && this.endIndex == tempCount)
				{
					this.startIndex = tempCount; // 赋值，开始 = 当前页码
					this.endIndex = tempCount + pageCountOffsetAll; // 赋值，结束 = 当前页码 + 偏移
					// 此时要判断计算后的结束是否大于最大页数
					if (this.endIndex > this.options.pageCount)
					{
						this.endIndex = this.options.pageCount;
					}
				}
				else if (this.endIndex > 0 && this.endIndex < tempCount)
				{
					// jyc 2015 1.5 add
					// console.log("tempCount:"+tempCount);
					// console.log("endIndex:"+this.endIndex);
					this.startIndex = tempCount; // 赋值，开始 = 当前页码
					this.endIndex = tempCount + pageCountOffsetAll; // 赋值，结束 = 当前页码 + 偏移
				}
				else if (this.startIndex > 0 && this.startIndex > tempCount)
				{
					// jyc 2015 1.5 add
					this.startIndex = tempCount; // 赋值，开始 = 当前页码
					this.endIndex = tempCount + pageCountOffsetAll; // 赋值，结束 = 当前页码 + 偏移
				}
				else if (this.startIndex == tempCount)
				{
					// 如果不是第一次点击，则需判断开始是否等于当前，如果等于当前，证明要进入上一组显示页码
					this.startIndex = tempCount - pageCountOffsetAll + 1;
					this.endIndex = tempCount;
				}
				if (this.startIndex > 0 && this.startIndex != 1)
				{
					// 判断开始位置大于0，同时开始位置不等于1，说明不是第一组页码，则需要输出 1...
					pageHtmlStr += this.GetPageHtml(1);
					pageHtmlStr += "<span class=\"dd\">...</span>";
				}
				if (this.startIndex <= 0)
				{
					this.startIndex = 1;
					this.endIndex = pageCountOffsetAll;
				}

				// console.log("pageCountOffsetAll:"+pageCountOffsetAll);
				if ((this.options.pageCount - tempCount) < pageCountOffsetAll)
				{
					// alert(3);

					this.startIndex = this.options.pageCount - pageCountOffsetAll;
					this.endIndex = this.options.pageCount;
				}

				for (var i = this.startIndex; i <= this.endIndex; i++)
				{
					if (this.options.pageNum == i)
					{
						pageHtmlStr += this.GetPageHtml(i, "xz", "first");
					}
					else
					{
						pageHtmlStr += this.GetPageHtml(i);
					}
				}
				if (this.endIndex != 0 && this.endIndex < this.options.pageCount)
				{
					pageHtmlStr += "<span class=\"dd\">...</span>";
					pageHtmlStr += this.GetPageHtml(this.options.pageCount);
				}
			}
		}
		else
		{
			for (var i = 1; i <= this.options.pageCount; i++)
			{
				if (this.options.pageNum == i)
				{
					pageHtmlStr += this.GetPageHtml(i, "xz");
				}
				else
				{
					pageHtmlStr += this.GetPageHtml(i);
				}
			}
		}

		pageHtmlStr += "<li id=\"li_pr_" + pagerPanelID + "\"><a href=\"JavaScript:;\" title=\"下一页\" onClick=\"" + this.outObj + ".GoPage(" + (parseInt(this.options.pageNum) + 1)
				+ ")\">&raquo;</a></li>";
		pageHtmlStr += "<span style=\"margin-left: 15px;\">向第</span>";
		pageHtmlStr += "<span><input id=\"" + pagerPanelID + "_tbx_pageCount\" onkeypress=\"" + this.outObj
				+ ".tbx_pageCount_OnKeyPress(this)\" name=\"tbx_pageCount\" class=\"form-control pageNum\" type=\"text\" style=\"padding-left:2px;padding-left:0px;\"  /></span>";
		pageHtmlStr += "<span>&nbsp;/&nbsp;" + this.options.pageCount + "&nbsp;页</span>";
		pageHtmlStr += "<span ><button class=\"btn btn-default btnGoPage\" type=\"button\" onclick=\"" + this.outObj + ".GoPage(document.getElementById('" + pagerPanelID
				+ "_tbx_pageCount').value)\">跳转</button></span>";
		pageHtmlStr += " <span style=\"margin-left: 10px;\">共 " + this.options.total + " 条记录</span>";
		pageHtmlStr += "    </ul>";
		pageHtmlStr += "</div>";
		$("#" + pagerPanelID).html(pageHtmlStr);
		$("#" + pagerPanelID + "_tbx_pageCount").numberbox({
			min : 1,
			width : 43,
			height : 30
		});
		document.getElementById(pagerPanelID + "_tbx_pageCount").value = this.options.pageNum;
	};

	this.GoPage = function(page)
	{
		if (page != undefined)
		{
			if (parseInt(page) <= 0)
			{
				page = 1;
			}
			if (parseInt(page) > this.options.pageCount)
			{
				page = this.options.pageCount;
			}
			this.options.pageNum = page;
			// alert(this.callBackEnent);
			if (PageCallBackEnent == null)
			{
				this.options.pageNum = page;
				queryParams = {
					rownumbers : true,
					pageSize : this.options.pageSize,
					pageNumber : this.options.pageNum
				};
				if (this.options.queryParams)
				{
					var params = this.options.queryParams();
					for ( var item in params)
					{
						queryParams[item] = params[item]
					}
				}
				// console.log(queryParams);
				// console.log(this.options.dataPanelID);

				$("#" + this.options.dataPanelID).datagrid("load", queryParams);
			}
			else
			{
				// alert(PageCallBackEnent);
				PageCallBackEnent(page);
			}
			if (this.options.gridPanel != undefined)
			{
				GoPageTop($("#" + this.options.gridPanel).offset().top - 40);
			}
		}
	};

	this.GetPageHtml = function(id, isXZ)
	{
		var resultStr = "";
		if (parseInt(id) <= 9)
		{
			id = "0" + id;
		}
		if (isXZ != undefined)
		{
			resultStr = "<li id=\"li_" + id + "\"><a href=\"JavaScript:;\" onClick=\"" + this.outObj + ".GoPage(" + id + ")\" class=\"xz\">" + id + "</a></li>";
		}
		else
		{
			resultStr = "<li id=\"li_" + id + "\"><a href=\"JavaScript:;\" onClick=\"" + this.outObj + ".GoPage(" + id + ")\" >" + id + "</a></li>";
		}
		return resultStr;
	};

	this.tbx_pageCount_OnKeyPress = function(eventObj)
	{
		if (event.keyCode == 13)
		{
			if (/^[1-9]\d*$/.test($(eventObj).val()))
			{
				this.GoPage(eventObj.value);
			}
		}
	};
}

function GoPageTop(topValue)
{
	// $('body,html').animate({ scrollTop: 0 }, 400);
	$('body,html').animate({
		scrollTop : topValue
	}, 400);
}

// 供所有的查询页面tbx使用
function tbx_OnKeyPress()
{
	if (event.keyCode == 13)
	{
		btn_Search_OnClick();
	}
}
// 给查询条件输入框绑定onkeypress="tbx_OnKeyPressCallBack(this);"增加此方法 按回车则进行查询
function tbx_OnKeyPressCallBack(ev, callBackFunction)
{
	var objEvt = $._data($(ev)[0], "events");
	if (objEvt && objEvt["keyup"])
	{
		/*
		 * 修改人：强当安 
		 * 修改时间：2015-12-21 
		 * 已经绑定了keyup事件就不要再重复绑定，否则回多次执行keyup事件，导致后台查询执行多次。
		 */
	}
	else
	{
		$(ev).keyup(function(e)
		{
			if (window.event)
			{
				e = window.event;
			}
			if (e.keyCode == 13)
			{
				if (callBackFunction)
				{
					callBackFunction();
				}
			}
		});
	}
	
}
// 给查询条件下拉绑定onchange="cmb_ChangeCallBack();"增加此方法 下拉选择后进行查询
function cmb_ChangeCallBack(ev, callBackFunction)
{
	if (callBackFunction)
	{
		callBackFunction();
	}
}
