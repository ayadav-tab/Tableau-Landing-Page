(function () {
let list_worksheet;
let bu_worksheet;
let list_data;
let bu_data;
$(document).ready(function () {
 // alert('page Loaded');
 tableau.extensions.initializeAsync().then(function () {
    //  alert('Connection Initialized');
      loadSelectedSheet();
    },function (err) {
      // Something went wrong in initialization.
      console.log('Error while Initializing: ' + err.toString());
    });
 
const D=[
  {n:"Advocacy Dashboard",bu:"Community Engagement",src:"Salesforce",url:"https://prod-useast-a.online.tableau.com/#/site/jdrf/views/Advocacy/AdvocacyDashboard"},
  {n:"Chapter Health Report",bu:"Chapter Operations",src:"Salesforce & Workday",url:"https://prod-useast-a.online.tableau.com/#/site/jdrf/workbooks/2468986/views"},
  {n:"Chapter Dashboard $$",bu:"Chapter Operations",src:"Workday",url:"https://prod-useast-a.online.tableau.com/#/site/jdrf/views/ChapterDashboard_17049733833480/ChapterDashboard?:iid=1"},
  {n:"4057 OUT001 Outreach Requests",bu:"Community Engagement",src:"Salesforce",url:"https://prod-useast-a.online.tableau.com/#/site/jdrf/views/4057OUT001OutreachRequests/4057OUT001OutreachRequests?:iid=1"},
  {n:"Southern Texas Outreach Report",bu:"Community Engagement",src:"Salesforce",url:"https://prod-useast-a.online.tableau.com/#/site/jdrf/views/SouthernTexasOutreachReportsuresh/SouthernTexasOutreachReport"},
  {n:"Community Engagement Dashboard",bu:"Community Engagement",src:"Salesforce",url:"https://prod-useast-a.online.tableau.com/#/site/jdrf/views/CommunityEngagementDashboard_17049599816680/CommunityEngagementDashboard?:iid=1"},
  {n:"Community Engagement – Paid Media Excluded",bu:"Community Engagement",src:"Salesforce",url:"https://prod-useast-a.online.tableau.com/#/site/jdrf/views/CommunityEngagementDashboard-PaidMediaExcluded_17231353573350/Requestsbychapter-ExcludingPaidMedia?:iid=1"},
  {n:"HCP Partner Dashboard",bu:"Community Engagement",src:"Salesforce",url:"https://prod-useast-a.online.tableau.com/#/site/jdrf/views/CEHCPPartnerDashboard_17291308657510/CEHCPPartnerDashboard?:iid=1"},
  {n:"Revenue Queued in Middleware – Summary",bu:"Development & Fundraising",src:"Salesforce",url:"https://prod-useast-a.online.tableau.com/#/site/jdrf/views/RevenueQueuedinMiddlewareSummaryReport/RevenueMiddleware?:iid=2"},
  {n:"Pledge Receivables",bu:"Development & Fundraising",src:"Salesforce",url:"https://prod-useast-a.online.tableau.com/#/site/jdrf/views/PledgeReceivable/PledgeReceivable?:iid=1"},
  {n:"Checks by Programs and Foreigners",bu:"Development & Fundraising",src:"Salesforce",url:"https://prod-useast-a.online.tableau.com/#/site/jdrf/views/ChecksbyProgramsandForeigners_16903464618280/ChecksbyProgramsandForeigners?:iid=1"},
  {n:"Weekly Deposit Report",bu:"Development & Fundraising",src:"Salesforce",url:"https://prod-useast-a.online.tableau.com/#/site/jdrf/views/WeeklyDepositReport/WeeklyDepositReport?:iid=1"},
  {n:"Weekly Payment Review",bu:"Development & Fundraising",src:"Salesforce",url:"https://prod-useast-a.online.tableau.com/#/site/jdrf/views/WeeklyPaymentReview_16903791292640/WeeklyPaymentChapter?:iid=1"},
  {n:"LO Transaction Fee Analysis",bu:"Development & Fundraising",src:"Salesforce",url:"https://prod-useast-a.online.tableau.com/#/site/jdrf/views/LOTransactionFeeAnalysis_16909942745930/LOTransactionFeeAnalysis?:iid=3"},
  {n:"Leads Report",bu:"Development & Fundraising",src:"Salesforce",url:"https://prod-useast-a.online.tableau.com/#/site/jdrf/views/LeadsReport_16861487581520/LeadsReport?:iid=1"},
  {n:"Weekly Stewardship Report",bu:"Development & Fundraising",src:"Salesforce",url:"https://prod-useast-a.online.tableau.com/#/site/jdrf/views/WeeklyStewardshipReport/WeeklyStewardship?:iid=4"},
  {n:"BreakthroughT1D Prohibited Partners",bu:"Development & Fundraising",src:"Salesforce",url:"https://prod-useast-a.online.tableau.com/#/site/jdrf/views/JDRFProhibitedPartners/JDRFProhibitedPartners-LR12122-42623?:iid=1"},
  {n:"Planned Giving Tier 1 Recent Donation",bu:"Development & Fundraising",src:"Salesforce",url:"https://prod-useast-a.online.tableau.com/#/site/jdrf/views/PlannedGivingTier1RecentDonationReport/PGTier1DonorsRecentDonationReport?:iid=1"},
  {n:"Direct Response Fundraising Dashboard",bu:"Development & Fundraising",src:"Salesforce",url:"https://prod-useast-a.online.tableau.com/#/site/jdrf/views/DirectResponseFundraisingDashboard_17037872295760/DirectResponseFundraisingDashboard?:iid=1"},
  {n:"Donor Health Report",bu:"Development & Fundraising",src:"Salesforce",url:"https://prod-useast-a.online.tableau.com/#/site/jdrf/views/DonorHealthDashboard_17031687522130/DonorHealthDashboard?:iid=2"},
  {n:"EBI Dashboard",bu:"Development & Fundraising",src:"Salesforce & EBI",url:"https://prod-useast-a.online.tableau.com/#/site/jdrf/views/EBI_17053371511850/EBIDashboard"},
  {n:"Monthly Donor Overview (GAU 5140)",bu:"Development & Fundraising",src:"Salesforce",url:"https://prod-useast-a.online.tableau.com/#/site/jdrf/views/MonthlyDonorOverviewGAUin5140_17060498116130/MonthlyDonorOverview?:iid=1"},
  {n:"BSD Original Campaigns Summary",bu:"Development & Fundraising",src:"Salesforce",url:"https://prod-useast-a.online.tableau.com/#/site/jdrf/views/BSDOriginalCampaignssummary/BSDOriginalCampaignssummary"},
  {n:"One Society, Current Members",bu:"Development & Fundraising",src:"Salesforce",url:"https://prod-useast-a.online.tableau.com/#/site/jdrf/views/OneSocietyCurrentMembers/OneSocietyCurrentMembers?:iid=1"},
  {n:"New Active Accounts by Fiscal Year",bu:"Development & Fundraising",src:"Salesforce",url:"https://prod-useast-a.online.tableau.com/#/site/jdrf/workbooks/1757984/views"},
  {n:"Board Financial Report V2",bu:"Development & Fundraising",src:"Salesforce",url:"https://prod-useast-a.online.tableau.com/#/site/jdrf/views/BoardFinancialReportV2/BoardFinancialReportV2?:iid=2"},
  {n:"IEM Report V1",bu:"Development & Fundraising",src:"Salesforce",url:"https://prod-useast-a.online.tableau.com/#/site/jdrf/views/IEMReport/IEMActivityReport?:iid=1"},
  {n:"BreakthroughT1D Your Way",bu:"Events",src:"LO",url:"https://prod-useast-a.online.tableau.com/#/site/jdrf/views/JDRFYourWay/JDRFYourWay?:iid=1"},
  {n:"National Challenges",bu:"Events",src:"LO",url:"https://prod-useast-a.online.tableau.com/#/site/jdrf/views/NationalChallenge/NationalChallenge?:iid=2"},
  {n:"Rider Tracking",bu:"Events",src:"LO",url:"https://prod-useast-a.online.tableau.com/#/site/jdrf/workbooks/1075425/views"},
  {n:"Walk Event Progress Table",bu:"Events",src:"LO",url:"https://prod-useast-a.online.tableau.com/#/site/jdrf/views/WalkEventProgressTable/WalkEventProgressTable"},
  {n:"Ride Event Progress Table",bu:"Events",src:"LO",url:"https://prod-useast-a.online.tableau.com/#/site/jdrf/views/RideEventProgressTable/RideEventProgress?:iid=1"},
  {n:"Walk Event Dashboard Phase 1",bu:"Events",src:"LO",url:"https://prod-useast-a.online.tableau.com/#/site/jdrf/views/WalkEventDashboardPhase1_17058540415390/WalkEventDashboardPhase1?:iid=2"},
  {n:"Signature Event Dashboard V1",bu:"Events",src:"GG",url:"https://prod-useast-a.online.tableau.com/#/site/jdrf/views/SignatureEventDashboard_17107226391460/SignatureEventDashboard?:iid=1"},
  {n:"Gala Event Progress Table",bu:"Events",src:"LO",url:"https://prod-useast-a.online.tableau.com/#/site/jdrf/views/GalaEventProgressTable_16963361603030/GalaEventProgressTable?:iid=3"},
  {n:"Marketing Leadership Dashboard",bu:"Marketing",src:"Social channels & Salesforce",url:"https://prod-useast-a.online.tableau.com/#/site/jdrf/workbooks/2072433/views"},
  {n:"Paid Social Media Dashboard",bu:"Marketing",src:"Social channels",url:"https://prod-useast-a.online.tableau.com/#/site/jdrf/workbooks/1252453/views"},
  {n:"Organic Social Media Dashboard",bu:"Marketing",src:"Social channels",url:"https://prod-useast-a.online.tableau.com/#/site/jdrf/views/OrganicSocialMediaDashboard/OrganicSocialMediaDashboard"},
  {n:"Email Overview Dashboard",bu:"Marketing",src:"Email",url:"https://prod-useast-a.online.tableau.com/#/site/jdrf/views/EmailOverview_17047203343480/EmailOverviewDashboard?:iid=2"},
  {n:"Email Overview",bu:"Marketing",src:"Email",url:"https://prod-useast-a.online.tableau.com/#/site/jdrf/views/EmailOverviewDashboardv1/EmailOverviewDashboard?:iid=5"},
  {n:"Email Report",bu:"Marketing",src:"Email",url:"https://prod-useast-a.online.tableau.com/#/site/jdrf/views/EmailReport_17047945825670/EmailReport?:iid=2"},
  {n:"Brand Audience Development",bu:"Marketing",src:"Mixed",url:"https://prod-useast-a.online.tableau.com/#/site/jdrf/views/AdhocDataPullTI2-427/AdhocDataPull24Months?:iid=1"},
  {n:"Google Analytics Overview",bu:"Marketing",src:"Google Analytics",url:"https://prod-useast-a.online.tableau.com/#/site/jdrf/views/GoogleAnalyticsOverview1/Main?:iid=1"},
  {n:"Organic Media Dashboard",bu:"Marketing",src:"Social channels",url:"https://prod-useast-a.online.tableau.com/#/site/jdrf/views/GoogleAnalyticsOverview_16818316705080/Main?:iid=4"},
  {n:"Chapter Dashboard",bu:"Chapter Operations",src:"Salesforce & Workday",url:"https://prod-useast-a.online.tableau.com/#/site/jdrf/workbooks/2468986/views"},
  {n:"Chapter KPI",bu:"Chapter Operations",src:"Salesforce & Workday",url:"https://prod-useast-a.online.tableau.com/#/site/jdrf/workbooks/2361744/views"},
  {n:"CGDO Dashboard",bu:"Chapter Operations",src:"Salesforce",url:"https://prod-useast-a.online.tableau.com/#/site/jdrf/workbooks/2439071/views"},
  {n:"Sanjoy's Dashboard",bu:"Research (Global)",src:"SmartSimple & Excel",url:"https://prod-useast-a.online.tableau.com/#/site/jdrf/views/SanjoysDashboard_17062070774160/SanjoysDashboard?:iid=2"},
  {n:"Development Pipeline",bu:"Research (Global)",src:"SmartSimple & Excel",url:"https://prod-useast-a.online.tableau.com/#/site/jdrf/views/DevelopmentPipeline/ResearchDevelopmentPipeline?:iid=3"},
  {n:"Risk Management",bu:"Research (Global)",src:"SmartSimple & Excel",url:"https://prod-useast-a.online.tableau.com/#/site/jdrf/views/RiskManagement_17018946542580/RiskManagement?:iid=1"},
  {n:"Leadership Giving",bu:"Research (Global)",src:"SmartSimple & Excel",url:"https://prod-useast-a.online.tableau.com/#/site/jdrf/views/LeadershipGivingDashboard_17023596142880/LeadershipGivingDashboard?:iid=1"},
  {n:"FY24 Dashboard",bu:"Research (Global)",src:"SmartSimple & Excel",url:"https://prod-useast-a.online.tableau.com/#/site/jdrf/views/FY24Dashboard_16995251908740/FY24Dashboard?:iid=3"},
  {n:"Leadership Team Dashboard",bu:"Research (Global)",src:"SmartSimple & Excel",url:"https://prod-useast-a.online.tableau.com/#/site/jdrf/views/LeadershipTeamDashboard/LeadershipTeamDashboard?:iid=2"},
  {n:"SPM Page DRAFT",bu:"Research (Global)",src:"SmartSimple & Excel",url:"https://prod-useast-a.online.tableau.com/#/site/jdrf/views/SPMPageDraft_17017687990940/SPMPageDraft?:iid=4"},
  {n:"Global / International Affiliates",bu:"Research (Global)",src:"SmartSimple & Excel",url:"https://prod-useast-a.online.tableau.com/#/site/jdrf/views/GlobalDashboard_17018945644030/GlobalDashboard?:iid=1"},
  {n:"FY21 Dashboard",bu:"Research (Global)",src:"SmartSimple & Excel",url:"https://prod-useast-a.online.tableau.com/#/site/jdrf/views/FY21Dashboard_17017663683270/FY21Dashboard?:iid=1"},
  {n:"FY23 Year-end Close",bu:"Research (Global)",src:"SmartSimple & Excel",url:"https://prod-useast-a.online.tableau.com/#/site/jdrf/views/FY23Year-endClose_17018904463210/FY23Year-endClose?:iid=4"},
  {n:"FY22 Dashboard",bu:"Research (Global)",src:"SmartSimple & Excel",url:"https://prod-useast-a.online.tableau.com/#/site/jdrf/views/FY22Dashboard_17017681921460/FY22Dashboard?:iid=1"},
  {n:"DMT Portfolio",bu:"Research (Global)",src:"SmartSimple & Excel",url:"https://prod-useast-a.online.tableau.com/#/site/jdrf/views/DMTPortfolio_17018947282520/Dashboard?:iid=2"},
  {n:"Stage of Development DRAFT",bu:"Research (Global)",src:"SmartSimple & Excel",url:"https://prod-useast-a.online.tableau.com/#/site/jdrf/views/StageofDevelopmentDraft_17019570057700/StageofDevDraftDashboard?:iid=2"},
  {n:"BreakthroughT1D Clinical Trial Dashboard",bu:"Research (Global)",src:"SmartSimple & Excel",url:"https://prod-useast-a.online.tableau.com/#/site/jdrf/views/JDRFsClinicalTrialDashboard_16984305000240/JDRFsClinicalTrialDashboard?:iid=1"},
  {n:"FY24 – June 2024",bu:"Research (Global)",src:"SmartSimple & Excel",url:"https://prod-useast-a.online.tableau.com/#/site/jdrf/views/FY24-June2024/FY24Dashboard?:iid=2"},
  {n:"FY24 Dashboard Test",bu:"Research (Global)",src:"SmartSimple & Excel",url:"https://prod-useast-a.online.tableau.com/#/site/jdrf/views/FY24Dashboardtest/FY24Dashboard?:iid=1"},
  {n:"CRN – Research Team",bu:"Research (Global)",src:"SmartSimple & Excel",url:"https://prod-useast-a.online.tableau.com/#/site/jdrf/views/CRNResearchTeam_17006638412390/AustraliaResearchTeamReport?:iid=2"},
  {n:"Clinical Trial Dashboard",bu:"Research (Global)",src:"SmartSimple & Excel",url:"https://prod-useast-a.online.tableau.com/#/site/jdrf/views/ClinicalTrialDashboard_17006640347560/ClinicalTrialDashboard?:iid=1"},
  {n:"BreakthroughT1D Leadership Dashboard",bu:"Research (Global)",src:"SmartSimple & Excel",url:"https://prod-useast-a.online.tableau.com/#/site/jdrf/views/JDRFLeadershipDashboard_17030782033290/Dashboard?:iid=2"},
  {n:"Exec Team Report",bu:"Research (Global)",src:"SmartSimple & Excel",url:"https://prod-useast-a.online.tableau.com/#/site/jdrf/views/ExecTeamReport_17018944851560/AustraliaResearchTeamReport?:iid=3"},
  {n:"Board Meeting",bu:"Research (Global)",src:"SmartSimple & Excel",url:"https://prod-useast-a.online.tableau.com/#/site/jdrf/views/BoardMeeting_16984305898210/Dashboard?:iid=3"},
  {n:"BreakthroughT1D Australia Clinical Trial",bu:"Research (Global)",src:"SmartSimple & Excel",url:"https://prod-useast-a.online.tableau.com/#/site/jdrf/views/JDRFAustraliaClinicalTrial/AustraliaClinicalTrials?:iid=1"},
];

const BU_CFG={
  "Development & Fundraising":{bar:"#002BFF",badge:"#002BFF",bdg_bg:"#E8EDFF",bdg_txt:"#001299"},
  "Events":{bar:"#78DCFF",badge:"#0B6E8A",bdg_bg:"#E0F7FF",bdg_txt:"#05455A"},
  "Marketing":{bar:"#FED7FF",badge:"#8A0B8A",bdg_bg:"#FFF0FF",bdg_txt:"#5A055A"},
  "Chapter Operations":{bar:"#0B1157",badge:"#0B1157",bdg_bg:"#E8E9F5",bdg_txt:"#07093A"},
  "Research (Global)":{bar:"#545454",badge:"#3A3A3A",bdg_bg:"#F0F0F0",bdg_txt:"#222"},
  "Community Engagement":{bar:"#002BFF",badge:"#002BFF",bdg_bg:"#E8EDFF",bdg_txt:"#001299"},
};

const SRC_CFG={
  salesforce:{bg:"#E8EDFF",txt:"#001299",label:"Salesforce"},
  ss:{bg:"#F0F0F0",txt:"#222",label:"SmartSimple"},
  lo:{bg:"#E0F7FF",txt:"#05455A",label:"LO"},
  wd:{bg:"#FFF5E0",txt:"#5A3500",label:"Workday"},
  social:{bg:"#FFF0FF",txt:"#5A055A",label:"Social"},
  ga:{bg:"#E8F5E9",txt:"#1B5E20",label:"Google Analytics"},
  other:{bg:"#F7F7F7",txt:"#545454",label:"Mixed"},
};

function srcKey(s){
  if(!s) return "other";
  const l=s.toLowerCase();
  if(l.includes("salesforce") && !l.includes("social") && !l.includes("workday") && !l.includes("ebi")) return "salesforce";
  if(l.includes("smartsimple")||l.includes("excel")) return "ss";
  if(l==="lo"||l.startsWith("lo")) return "lo";
  if(l.includes("workday")) return "wd";
  if(l.includes("social")||l.includes("email")) return "social";
  if(l.includes("google")) return "ga";
  return "other";
}

function srcBadge(s){
  const k=srcKey(s);
  const c=SRC_CFG[k]||SRC_CFG.other;
  const label=s.length>18?s.substring(0,16)+"…":s;
  return `<span class="src-tag" style="background:${c.bg};color:${c.txt}">${label}</span>`;
}

function srcFilterKey(s){
  const l=s.toLowerCase();
  if(l.includes("salesforce")) return "sf";
  if(l.includes("smartsimple")||l.includes("excel")) return "ss";
  if(l==="lo"||l.startsWith("lo")) return "lo";
  if(l.includes("workday")) return "wd";
  if(l.includes("social")||l.includes("email")) return "social";
  if(l.includes("google")) return "ga";
  return "";
}

const BU_ORDER=["Development & Fundraising","Events","Marketing","Chapter Operations","Research (Global)","Community Engagement"];
let cBU="all",cSrch="",cSrc="";

function filtered(){
  return list_data.filter(d=>{
    const mBU=cBU==="all"||d.bu===cBU;
    const mSrch=!cSrch||d.n.toLowerCase().includes(cSrch)||d.src.toLowerCase().includes(cSrch);
    const mSrc=!cSrc||srcFilterKey(d.src)===cSrc;
    return mBU&&mSrch&&mSrc;
  });
}

function card(d){
  const cfg=BU_CFG[d.bu]||{bar:"#002BFF"};
  return `<a class="dcard" href="${d.url}" target="_blank" rel="noopener">
    <div class="dcard-accent" style="background:${cfg.bar}"></div>
    <div class="dcard-top">
      <div class="dcard-name">${d.n}</div>
      <div class="dcard-arrow">↗</div>
    </div>
    <div class="dcard-meta">${srcBadge(d.src)}</div>
  </a>`;
}

function render(){
  const list=filtered();
  document.getElementById("res-cnt").textContent=list.length+" result"+(list.length!==1?"s":"");
  const el=document.getElementById("content");
  if(!list.length){
    el.innerHTML=`<div class="empty"><div class="empty-ring">○</div><div class="empty-t">No dashboards found</div><div class="empty-s">Adjust your search or filter criteria</div></div>`;
    return;
  }
  if(cBU!=="all"){
    el.innerHTML=`<div class="grid">${list.map(card).join("")}</div>`;
    return;
  }
  let h="";
  const groups={};
  list.forEach(d=>{if(!groups[d.bu])groups[d.bu]=[];groups[d.bu].push(d);});
  BU_ORDER.forEach(bu=>{
    const items=groups[bu];
    if(!items||!items.length) return;
    const cfg=BU_CFG[bu]||{bar:"#002BFF"};
    h+=`<div class="section"><div class="sec-hd"><div class="sec-bar" style="background:${cfg.bar}"></div><div class="sec-title">${bu}</div><div class="sec-line"></div><div class="sec-cnt">${items.length}</div></div><div class="grid">${items.map(card).join("")}</div></div>`;
  });
  el.innerHTML=h;
}

document.getElementById("srch").addEventListener("input",e=>{cSrch=e.target.value.trim().toLowerCase();render();});
document.getElementById("src-sel").addEventListener("change",e=>{cSrc=e.target.value;render();});
document.querySelectorAll(".bu-chip").forEach(c=>{
  c.addEventListener("click",()=>{
    document.querySelectorAll(".bu-chip").forEach(x=>x.classList.remove("active"));
    c.classList.add("active");
    cBU=c.dataset.bu;
    render();
  });
});

 });

 
function loadSelectedSheet() {
     debugger;
    console.log(tableau.extensions);
    list_worksheet = tableau.extensions.dashboardContent.dashboard.worksheets
        .find(ws => ws.name === 'list');

    bu_worksheet = tableau.extensions.dashboardContent.dashboard.worksheets
        .find(ws => ws.name === 'bu');
    
    loadData();  // 👈 call your data function
}
async function loadData() {

  await  list_worksheet.getSummaryDataAsync().then(function (sumdata) {
        list_data=tableauToJson(sumdata);
         console.log(list_data);
        

    });
   await bu_worksheet.getSummaryDataAsync().then(function (sumdata) {
        bu_data=tableauToJson(sumdata);
        console.log(bu_data);
       

    });
     render_data(list_data,bu_data);
    
   
    //render();
}
function render_data(list_data,bu_data)
{
    $('#total-stat').text(list_data.length);
    $('#bu_count').text(bu_data.length);

    let html = `<div class="bu-chip active" data-bu="all">All <span class="cnt" id="cnt-all">${list_data.length}</span></div>`;

    bu_data.forEach(row => {
      let bu_count = list_data.filter(x => x.Project === row.Project).length;
        html += `
            <div class="bu-chip" data-bu="Development &amp; Fundraising">${row.Project} <span class="cnt">${bu_count}</span></div>
        `;
    });

    $('#bu-rail').html(html);
    const source = [
    ...new Set(list_data.map(x => TRIM(x.Source.split('&',0))))
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
} 

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

})();
