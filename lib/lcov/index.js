"use strict";
/*
 Copyright 2012-2015, Yahoo Inc.
 Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
const { ReportBase } = require("istanbul-lib-report");
const LcovOnlyReport = require("../lcovonly");
const HtmlReport = require("../html");
const TextSummaryReport = require("../text-summary");

class LcovReport extends ReportBase {
  constructor(opts) {
    super();
    this.lcov = new LcovOnlyReport({ file: "lcov.info", ...opts });

    if (!opts.lcovOnly) {
      this.html = new HtmlReport({});
      this.sum = new TextSummaryReport();
    }
  }
}

["Start", "End", "Summary", "SummaryEnd", "Detail"].forEach(what => {
  const meth = "on" + what;
  LcovReport.prototype[meth] = function (...args) {
    const lcov = this.lcov;
    const html = this.html;
    const sum = this.sum;

    if (lcov[meth]) {
      lcov[meth](...args);
    }

    if (html && html[meth]) {
      html[meth](...args);
    }
    if (sum && sum[meth]) {
      sum[meth](...args);
    }
  };
});

module.exports = LcovReport;
