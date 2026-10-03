const calculateAttention = (analysis) => {

    let score = 0;
    const reasons = [];
    const deadlineDetails = [];

    // Safety check
    if (!analysis) {
        return {
            score: 0,
            priority: "normal",
            reasons: ["No document analysis available"],
            deadlineDetails: []
        };
    }


    // ==========================================
    // 1. DEADLINE ANALYSIS
    // ==========================================

    if (analysis.deadlines && analysis.deadlines.length > 0) {

        const now = new Date();

        for (const deadline of analysis.deadlines) {

            if (!deadline.date) {
                continue;
            }

            const deadlineDate = new Date(deadline.date);

            // Difference in days
            const difference =
                deadlineDate.getTime() - now.getTime();

            const daysRemaining =
                Math.ceil(
                    difference /
                    (1000 * 60 * 60 * 24)
                );


            // Past deadline
            if (daysRemaining < 0) {

                deadlineDetails.push({
                    description: deadline.description,
                    date: deadline.date,
                    daysRemaining,
                    status: "past"
                });

                continue;
            }


            // Deadline within 2 days
            if (daysRemaining <= 2) {

                score += 50;

                reasons.push(
                    `Deadline within ${daysRemaining} day(s): ${deadline.description}`
                );

                deadlineDetails.push({
                    description: deadline.description,
                    date: deadline.date,
                    daysRemaining,
                    status: "critical"
                });

                continue;
            }


            // Deadline within 7 days
            if (daysRemaining <= 7) {

                score += 35;

                reasons.push(
                    `Deadline within 7 days: ${deadline.description}`
                );

                deadlineDetails.push({
                    description: deadline.description,
                    date: deadline.date,
                    daysRemaining,
                    status: "urgent"
                });

                continue;
            }


            // Deadline within 30 days
            if (daysRemaining <= 30) {

                score += 20;

                reasons.push(
                    `Upcoming deadline: ${deadline.description}`
                );

                deadlineDetails.push({
                    description: deadline.description,
                    date: deadline.date,
                    daysRemaining,
                    status: "upcoming"
                });

                continue;
            }


            // More than 30 days
            score += 10;

            deadlineDetails.push({
                description: deadline.description,
                date: deadline.date,
                daysRemaining,
                status: "future"
            });
        }
    }


    // ==========================================
    // 2. OBLIGATION ANALYSIS
    // ==========================================

    const obligationCount =
        analysis.obligations?.length || 0;

    if (obligationCount >= 8) {

        score += 30;

        reasons.push(
            `${obligationCount} obligations detected`
        );

    } else if (obligationCount >= 4) {

        score += 20;

        reasons.push(
            `${obligationCount} obligations detected`
        );

    } else if (obligationCount >= 1) {

        score += 10;

        reasons.push(
            `${obligationCount} obligation(s) detected`
        );
    }


    // ==========================================
    // 3. COMPLIANCE ANALYSIS
    // ==========================================

    const complianceCount =
        analysis.complianceRequirements?.length || 0;

    if (complianceCount >= 4) {

        score += 15;

        reasons.push(
            `${complianceCount} compliance requirements detected`
        );

    } else if (complianceCount >= 1) {

        score += 5;

        reasons.push(
            `${complianceCount} compliance requirement(s) detected`
        );
    }


    // ==========================================
    // 4. LIMIT SCORE TO 100
    // ==========================================

    score = Math.min(score, 100);


    // ==========================================
    // 5. DETERMINE PRIORITY
    // ==========================================

    let priority;

    if (score >= 76) {

        priority = "critical";

    } else if (score >= 51) {

        priority = "high";

    } else if (score >= 21) {

        priority = "medium";

    } else {

        priority = "normal";
    }


    // ==========================================
    // 6. HISTORICAL DOCUMENT CHECK
    // ==========================================

    const hasFutureDeadline =
        deadlineDetails.some(
            deadline =>
                deadline.status !== "past"
        );

    const hasOnlyPastDeadlines =
        deadlineDetails.length > 0 &&
        !hasFutureDeadline;


    if (hasOnlyPastDeadlines) {

        // Don't show historical documents
        // as active urgent items.

        priority = "normal";

        reasons.unshift(
            "All detected deadlines have passed"
        );
    }


    return {
        score,
        priority,
        reasons,
        deadlineDetails
    };
};


module.exports = {
    calculateAttention
};