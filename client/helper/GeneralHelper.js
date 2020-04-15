class GeneralHelper {
  getPdfDownloadUrl = (
    boardSlugName,
    levelSlugName,
    subjectSlugName,
    moduleSlugName
  ) => {
    // https://images.znotes.org/pdfs/board-level-subject-module.pdf  //  sample
    const slugsUrls = `${boardSlugName}-${levelSlugName}-${subjectSlugName}-${moduleSlugName}`;
    const url = `http://images.znotes.org/pdfs/${slugsUrls}.pdf`;
    return url;
  };
}

export default new GeneralHelper();
