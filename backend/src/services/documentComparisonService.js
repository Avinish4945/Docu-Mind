const Document = require("../models/Document");


const compareDocuments = async (
    oldDocumentId,
    newDocumentId
) => {

    const oldDocument =
        await Document.findById(oldDocumentId);

    const newDocument =
        await Document.findById(newDocumentId);


    if (!oldDocument) {
        throw new Error(
            "Old document not found"
        );
    }

    if (!newDocument) {
        throw new Error(
            "New document not found"
        );
    }


    // --------------------------------
    // Compare deadlines
    // --------------------------------

    const oldDeadlines =
        oldDocument.analysis?.deadlines || [];

    const newDeadlines =
        newDocument.analysis?.deadlines || [];


    const deadlineChanges = [];


    newDeadlines.forEach(
        (newDeadline) => {

            const matchingOldDeadline =
                oldDeadlines.find(
                    (oldDeadline) =>
                        oldDeadline.description
                            .toLowerCase()
                            .includes(
                                newDeadline.description
                                    .toLowerCase()
                            ) ||
                        newDeadline.description
                            .toLowerCase()
                            .includes(
                                oldDeadline.description
                                    .toLowerCase()
                            )
                );


            if (!matchingOldDeadline) {

                deadlineChanges.push({
                    type: "added",
                    description:
                        newDeadline.description,
                    newDate:
                        newDeadline.date,
                    sourceText:
                        newDeadline.sourceText
                });

                return;
            }


            const oldDate =
                new Date(
                    matchingOldDeadline.date
                ).getTime();

            const newDate =
                new Date(
                    newDeadline.date
                ).getTime();


            if (oldDate !== newDate) {

                deadlineChanges.push({
                    type: "changed",

                    description:
                        newDeadline.description,

                    oldDate:
                        matchingOldDeadline.date,

                    newDate:
                        newDeadline.date,

                    oldSourceText:
                        matchingOldDeadline.sourceText,

                    newSourceText:
                        newDeadline.sourceText
                });
            }
        }
    );


    // Check removed deadlines

    oldDeadlines.forEach(
        (oldDeadline) => {

            const stillExists =
                newDeadlines.some(
                    (newDeadline) =>
                        newDeadline.description
                            .toLowerCase()
                            .includes(
                                oldDeadline.description
                                    .toLowerCase()
                            ) ||
                        oldDeadline.description
                            .toLowerCase()
                            .includes(
                                newDeadline.description
                                    .toLowerCase()
                            )
                );


            if (!stillExists) {

                deadlineChanges.push({
                    type: "removed",

                    description:
                        oldDeadline.description,

                    oldDate:
                        oldDeadline.date,

                    oldSourceText:
                        oldDeadline.sourceText
                });
            }
        }
    );


    // --------------------------------
    // Compare obligations
    // --------------------------------

    const oldObligations =
        oldDocument.analysis?.obligations || [];

    const newObligations =
        newDocument.analysis?.obligations || [];


    const obligationChanges = [];


    newObligations.forEach(
        (newObligation) => {

            const exists =
                oldObligations.some(
                    (oldObligation) =>
                        oldObligation.description
                            .toLowerCase() ===
                        newObligation.description
                            .toLowerCase()
                );


            if (!exists) {

                obligationChanges.push({
                    type: "added",

                    description:
                        newObligation.description,

                    responsibleParty:
                        newObligation.responsibleParty,

                    sourceText:
                        newObligation.sourceText
                });
            }
        }
    );


    oldObligations.forEach(
        (oldObligation) => {

            const exists =
                newObligations.some(
                    (newObligation) =>
                        newObligation.description
                            .toLowerCase() ===
                        oldObligation.description
                            .toLowerCase()
                );


            if (!exists) {

                obligationChanges.push({
                    type: "removed",

                    description:
                        oldObligation.description,

                    responsibleParty:
                        oldObligation.responsibleParty,

                    sourceText:
                        oldObligation.sourceText
                });
            }
        }
    );


    // --------------------------------
    // Compare compliance
    // --------------------------------

    const oldCompliance =
        oldDocument.analysis
            ?.complianceRequirements || [];

    const newCompliance =
        newDocument.analysis
            ?.complianceRequirements || [];


    const complianceChanges = [];


    newCompliance.forEach(
        (newRequirement) => {

            const exists =
                oldCompliance.some(
                    (oldRequirement) =>
                        oldRequirement.description
                            .toLowerCase() ===
                        newRequirement.description
                            .toLowerCase()
                );


            if (!exists) {

                complianceChanges.push({
                    type: "added",

                    description:
                        newRequirement.description,

                    sourceText:
                        newRequirement.sourceText
                });
            }
        }
    );


    oldCompliance.forEach(
        (oldRequirement) => {

            const exists =
                newCompliance.some(
                    (newRequirement) =>
                        newRequirement.description
                            .toLowerCase() ===
                        oldRequirement.description
                            .toLowerCase()
                );


            if (!exists) {

                complianceChanges.push({
                    type: "removed",

                    description:
                        oldRequirement.description,

                    sourceText:
                        oldRequirement.sourceText
                });
            }
        }
    );


    return {

        oldDocument: {
            id: oldDocument._id,
            title: oldDocument.title
        },

        newDocument: {
            id: newDocument._id,
            title: newDocument.title
        },

        changes: {

            deadlines:
                deadlineChanges,

            obligations:
                obligationChanges,

            compliance:
                complianceChanges
        },

        summary: {

            deadlinesChanged:
                deadlineChanges.length,

            obligationsChanged:
                obligationChanges.length,

            complianceChanged:
                complianceChanges.length,

            totalChanges:
                deadlineChanges.length +
                obligationChanges.length +
                complianceChanges.length
        }
    };
};


module.exports = {
    compareDocuments
};