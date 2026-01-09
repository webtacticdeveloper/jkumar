import { notFound, redirect } from "next/navigation";

const object:{ [key: string]: string }={
    "Board%20Of%20Directors":"/investor-corner/disclosures-under-regulation-46-of-sebi-lodr-and-shareholder's-data/board-of-directors",
    "Policies":"/investor-corner/investor-information/policies",
    "Annual%20Returns":"/investor-corner/disclosures-under-regulation-46-of-sebi-lodr-and-shareholder's-data/annual-returns",
    "Appointment%20Letters":"/investor-corner/investor-information/appointment-letters",
    "Insider%20Trading%20Caution":"/investor-corner/investor-information/insider-trading-caution",
    "Annual%20Reports":"/investor-corner/financials-and-reports/annual-reports",
    "Quarterly%20Results":"/investor-corner/financials-and-reports/quarterly-results",
    "Corporate%20Governance%20Report":"/investor-corner/investor-information/corporate-governance-report",
    "Stock%20Exchange%20Disclousers":"/investor-corner/investor-information/stock-exchange-disclousers",
    "Investor%20Presentation":"/investor-corner/investor-information/investor-presentation",
    "Transcript%20Of%20Conference%20Calls":"/investor-corner/investor-information/transcript-of-conference-call",
    "Transcript%20of%20Conference%20Call":"/investor-corner/investor-information/transcript-of-conference-call",
    "Annual%20Secretarial%20Compliances":"/investor-corner/disclosures-under-regulation-46-of-sebi-lodr-and-shareholder's-data/annual-secretarial-compliances",
    "Notice%20and%20Voting%20Results":"/investor-corner/investor-information/notice-and-voting-results",
    "Corporate%20Social%20Responsibility":"/investor-corner/investor-information/corporate-social-responsibility",
    "Unpaid%20Dividend%20Information":"/investor-corner/investor-information/unpaid-dividend-information",
    "AGM-EGM%20Information":"/investor-corner/investor-information/agm-egm-information",
    "AGM%20EGM%20Information":"/investor-corner/investor-information/agm-egm-information",
    "Investor%20Complaints":"/investor-corner/investor-information/investor-complaints",
    "Familiarisation%20Programme":"/investor-corner/disclosures-under-regulation-46-of-sebi-lodr-and-shareholder's-data/familiarisation-programme",
    "Press%20Release":"/investor-corner/financials-and-reports/press-release",
    "Credit%20Rating":"/investor-corner/disclosures-under-regulation-46-of-sebi-lodr-and-shareholder's-data/credit-rating",
    "Download%20Forms":"/investor-corner/important-update-for-shareholder/download-forms",
    "Online%20Dispute%20Resolution":"/investor-corner/important-update-for-shareholder/online-dispute-resolution",
    "Shareholding%20Pattern":"/investor-corner/disclosures-under-regulation-46-of-sebi-lodr-and-shareholder's-data/shareholding-pattern",
    "Board%20Committees":"/storage/reportFile/BoardCommittees.pdf",
    "Initiative%20under%20100%20days%20Campaign":"/investor-corner/important-update-for-shareholder/initiative-under-100-days-campaign"
}

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const id=(await params).id;
    if(object[id]){
        redirect(object[id]);
    }
    return notFound();
};

export default Page;
