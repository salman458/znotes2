class GeneralHelper {
  getPdfDownloadUrl = (
    boardSlugName,
    levelSlugName,
    subjectSlugName,
    moduleSlugName
  ) => {
    // https://images.znotes.org/pdfs/board-level-subject-module.pdf  //  sample
    const slugsUrls = `${boardSlugName}-${levelSlugName}-${subjectSlugName}-${moduleSlugName}`.toLowerCase();
    const url = `https://images.znotes.org/pdfs/${slugsUrls}.pdf`;
    return url;
  };
}

export default new GeneralHelper();
