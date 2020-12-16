//get All Feedback Data
getAllFeedbackData() {
    this.axios({
      method: "GET",
      url: this.getUrl(1, 1000),
    headers:{
            Authorization: sessionStorage.getItem("token"),
        },
    }).then((res) => {
      //超出限制用... 和 修改日期
      this.testTableData = res.data.result.records;
      for (let TableData of this.testTableData) {
        TableData.briefDescribe = TableData.briefDescribe
          .toString()
          .substr(0, [11])
          .concat("...");
        TableData.time = TableData.time.replace(/T/g, "-");
        TableData.questionType = "    ".concat(TableData.questionType);
        // for(let i = 0;i<TableData.declareDescribe.length/20;i++){
            // TableData.declareDescribe.substr(i,[(i+1)*20]).concat("<br />")
        // }
        // console.log(TableData.softwareName + TableData.id)
      }
      //按照日期排序
      this.arrSortByTime(this.testTableData);
      console.log(this.testTableData.length);
      //计算page总数
      this.pagecount =
        this.testTableData.length % 8 === 0
          ? this.testTableData.length / 8
          : (this.testTableData.length - (this.testTableData.length % 8)) /
              8 +
            1;
      // console.log(this.pagecount);

      this.getTable(1);
    });
  }
  
  arrSortByTime(arr) {
    //升序排序
    arr.sort(function (a, b) {
      if (a.time < b.time) {
        return -1;
      } else if (a.time > b.time) {
        return 1;
      } else {
        if (a.time < b.time) {
          return 1;
        } else if (a.time > b.time) {
          return -1;
        }
        return 0;
      }
    });
  }