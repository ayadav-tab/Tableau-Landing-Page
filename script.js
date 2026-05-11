(function () {
  //GLOBAL VARIABLES
  let list_worksheet;
  let bu_worksheet;
  let list_data;
  let bu_data;
  $(document).ready(function () { //PAGE LOAD
    // alert('page Loaded');
    tableau.extensions.initializeAsync().then(function () { //TABLEAU EXTENTION STARTS
      //  alert('Connection Initialized');
      loadSelectedSheet();
    }, function (err) {
      // Something went wrong in initialization.
      console.log('Error while Initializing: ' + err.toString());
    });
  });

  //GET DATA FROM SHEET
  function loadSelectedSheet() {
    console.log(tableau.extensions);
    list_worksheet = tableau.extensions.dashboardContent.dashboard.worksheets
      .find(ws => ws.name === 'list');

    bu_worksheet = tableau.extensions.dashboardContent.dashboard.worksheets
      .find(ws => ws.name === 'bu');

    loadData();  // 👈 call your data function
  }
   //GET DATA FROM SHEET
  async function loadData() {

    await list_worksheet.getSummaryDataAsync().then(function (sumdata) {
      list_data = tableauToJson(sumdata);
      console.log(list_data);


    });
    await bu_worksheet.getSummaryDataAsync().then(function (sumdata) {
      bu_data = tableauToJson(sumdata);
      console.log(bu_data);
    });
    render_data(list_data, bu_data);

  }
  //Render One time DATA
  function render_data(list_data, bu_data) {
    $('#total-stat').text(list_data.length);
    $('#res-cnt').text(list_data.length);
    $('#bu_count').text(bu_data.length);

    let html = `<div class="bu-chip active" data-bu="all">All <span class="cnt" id="cnt-all">${list_data.length}</span></div>`;

    bu_data.forEach(row => {
      let bu_count = list_data.filter(x => x.Project === row.Project).length;
      html += `
            <div class="bu-chip"  data-bu="${row.Project}">${row.Project_Label} <span class="cnt">${bu_count}</span></div>
        `;
    });

    $('#bu-rail').html(html);
    const source = [
      ...new Set(list_data.map(x => x.Source?.split('&')[0].trim()).filter(x => x).sort(x => x.Source))
    ];
    let htmlsrc = '<option value="">All sources</option>';

    source.forEach(source => {

      htmlsrc += `
            <option value="${source}">
                ${source}
            </option>
        `;
    });

    $('#src-sel').html(htmlsrc);
    render_cards();
    // Adding Event Listeners for Filtering the List. 
    document.getElementById("srch").addEventListener("input", e => { cSrch = e.target.value; render_cards(); });
    document.getElementById("src-sel").addEventListener("change", e => { cSrc = e.target.value; render_cards(); });
    document.querySelectorAll(".bu-chip").forEach(c => {
      c.addEventListener("click", () => {
        document.querySelectorAll(".bu-chip").forEach(x => x.classList.remove("active"));
        c.classList.add("active");
        cBU = c.dataset.bu;
        render_cards();
      });
    });
  }
  //Renders the Dashboard Cards..
  function render_cards() {
    const filtereddata = filtered();
    document.getElementById("res-cnt").textContent = filtereddata.length + " result" + (filtereddata.length !== 1 ? "s" : "");
    const el = document.getElementById("content");
    if (!filtereddata.length) {
      el.innerHTML = `<div class="empty"><div class="empty-ring">○</div><div class="empty-t">No dashboards found</div><div class="empty-s">Adjust your search or filter criteria</div></div>`;
      return;
    }
    if (cBU !== "all") {
      el.innerHTML = `<div class="grid">${filtereddata.map(card).join("")}</div>`;
      return;
    }
    let h = "";
    const filteredProjects = new Set(
      filtereddata.map(item => item.Project)
    );

    const result = bu_data.filter(item =>
      filteredProjects.has(item.Project)
    );
    result.forEach(bu => {
      const items = filtereddata.filter(x => x.Project === bu.Project);
      h += `<div class="section"><div class="sec-hd"><div class="sec-bar" style="background:${bu.Bar}">
          </div><div class="sec-title">${bu.Project}</div>
          <div class="sec-line"></div>
          <div class="sec-cnt">${items.length}</div></div>
          <div class="grid">${items.map(card).join("")}</div></div>`;
    });
    document.getElementById("content").innerHTML = h;


  }
  //Helper Function Convert Tableau Sheet data to Array Object Format.
  function tableauToJson(sumdata) {

    return sumdata.data.map(row => {

      let obj = {};

      sumdata.columns.forEach((col, index) => {

        obj[col.fieldName] = row[index]?.value;
        obj[col.fieldName + "_formatted"] = row[index]?.formattedValue;

      });

      return obj;
    });
  }
  //Filter Function Which Filters the data based on User Inputs
  let cBU = "all", cSrch = "", cSrc = "";
  function filtered() {
    console.log(cSrc);
    console.log(cSrch);
    return list_data.filter(d => {
      const mBU = cBU === "all" || d.Project === cBU;
      const mSrch = !cSrch || d["Display Name"].toLowerCase().includes(cSrch) || d.Source.toLowerCase().includes(cSrch);
      const mSrc = !cSrc || d.Source === cSrc;
      return mBU && mSrch && mSrc;
    });
  }
  //Render Dashboard Cards
  function card(d) {
    const cfg = d.Project || { bar: "#002BFF" };
    const bar = bu_data.filter(x => x.Project === d.Project)[0].Bar;
    return `<a class="dcard" href="${d.Link}" target="_blank" rel="noopener">
    <div class="dcard-accent" style="background:${bar}"></div>
    <div class="dcard-top">
      <div class="dcard-name">${d["Display Name"]}</div>
      <div class="dcard-arrow">↗</div>
    </div>
    <div class="dcard-meta">${srcBadge(d)}</div>
  </a>`;
  }
  //Format Source Badge Backgroud and Text
  function srcBadge(s) {

    return `<span class="src-tag" style="background:${s.Bg};color:${s.Txt}">${s.Label}</span>`;
  }
})();
