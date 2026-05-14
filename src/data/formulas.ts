/**
 * Statistics formulas for psychology students
 * Each formula includes LaTeX notation, description, and psychology-relevant examples
 */

export type FormulaCategory = 'Descriptive' | 'Correlation' | 'Inferential' | 'Tests';

export interface Formula {
  id: string;
  title: string;
  category: FormulaCategory;
  latex: string;
  description: string;
  whenToUse: string;
  interpretation: string;
  examples: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  keywords: string[];
  commonMistakes?: string[];
  relatedFormulas?: string[];
}

export const formulas: Formula[] = [
  // DESCRIPTIVE STATISTICS
  {
    id: 'mean',
    title: 'Arithmetic Mean',
    category: 'Descriptive',
    latex: '\\bar{x} = \\frac{\\sum_{i=1}^{n} x_i}{n}',
    description: 'The arithmetic mean (average) is the sum of all values divided by the number of values. It represents the "center of mass" of your data and is the most commonly used measure of central tendency in psychology research.',
    whenToUse: 'Use the mean when your data is continuous, roughly symmetrical, and has no extreme outliers. It works best for interval or ratio data like test scores, reaction times, or rating scales.',
    interpretation: 'The mean tells you the typical or expected value in your dataset. For example, a mean BDI-II score of 22 indicates moderate depression severity on average for your sample.',
    examples: [
      'Calculate the average depression score (BDI-II) for 30 therapy patients: Scores sum to 480, so mean = 480/30 = 16 (mild depression)',
      'Find mean reaction time in a Stroop task: 250ms + 300ms + 275ms + 280ms + 295ms = 1400ms; Mean = 1400/5 = 280ms',
      'Compute average anxiety rating (1-10 scale) for 50 participants to establish baseline levels before intervention',
      'Calculate mean IQ score for a clinical sample to compare against population norms (μ = 100, σ = 15)'
    ],
    difficulty: 'beginner',
    keywords: ['average', 'central tendency', 'sum', 'count', 'typical value'],
    commonMistakes: [
      'Using mean with highly skewed data (use median instead)',
      'Forgetting that mean is sensitive to outliers',
      'Applying mean to ordinal or categorical data inappropriately'
    ],
    relatedFormulas: ['median', 'std-dev', 'variance']
  },
  {
    id: 'median',
    title: 'Median',
    category: 'Descriptive',
    latex: 'Md = \\begin{cases} x_{\\frac{n+1}{2}} & \\text{if } n \\text{ is odd} \\\\ \\frac{x_{\\frac{n}{2}} + x_{\\frac{n}{2}+1}}{2} & \\text{if } n \\text{ is even} \\end{cases}',
    description: 'The median is the middle value when data is arranged in ascending order. For even-numbered datasets, it is the average of the two middle values. It is a robust measure of central tendency that is not affected by extreme scores.',
    whenToUse: 'Use the median when your data has outliers, is skewed, or when working with ordinal data. It is especially useful for income data, response times with extreme values, or any measure where outliers could distort the mean.',
    interpretation: 'The median indicates that 50% of scores fall below this value and 50% fall above. It represents the "typical" participant more accurately than the mean when data is skewed.',
    examples: [
      'Reaction times: 200ms, 210ms, 220ms, 250ms, 900ms. Mean = 356ms (distorted), but Median = 220ms (more representative)',
      'Income of therapists in a clinic: $50K, $55K, $60K, $65K, $200K. Median = $60K shows typical salary better than mean ($86K)',
      'Pain ratings (1-10) with outliers: 3, 4, 4, 5, 5, 6, 10. Median = 5 is more representative than mean = 5.3',
      'Ordinal satisfaction ratings (1-5 stars): Sort all ratings, find the middle value to report typical customer satisfaction'
    ],
    difficulty: 'beginner',
    keywords: ['middle', 'central tendency', 'order', 'robust', '50th percentile', 'resistant'],
    commonMistakes: [
      'Forgetting to sort data before finding the median',
      'Not averaging the two middle values for even-numbered datasets',
      'Using median when mean is appropriate (symmetric distributions)'
    ],
    relatedFormulas: ['mean', 'variance']
  },
  {
    id: 'mode',
    title: 'Mode',
    category: 'Descriptive',
    latex: 'Mode = \\text{Most frequently occurring value(s)}',
    description: 'The mode is the value that appears most frequently in a dataset. A distribution can have one mode (unimodal), two modes (bimodal), or multiple modes (multimodal). It is the only measure of central tendency applicable to categorical data.',
    whenToUse: 'Use mode for categorical/nominal data (e.g., diagnosis categories, gender), or to identify the most common response in a distribution. Also useful for identifying multiple peaks in bimodal distributions.',
    interpretation: 'The mode tells you the most popular or common value. In clinical contexts, it might reveal the most common diagnosis, treatment preference, or symptom pattern.',
    examples: [
      'Depression severity categories for 100 patients: Mild (35), Moderate (45), Severe (20). Mode = Moderate (most common)',
      'Preferred therapy type: CBT (40), Psychodynamic (25), Humanistic (15), Other (20). Mode = CBT',
      'Number of panic attacks per week: 0, 1, 2, 2, 2, 3, 3, 5. Mode = 2 (most frequent)',
      'Likert scale responses (1-5): If 30% chose "Agree" (4), this is the modal response'
    ],
    difficulty: 'beginner',
    keywords: ['frequency', 'most common', 'categorical', 'nominal', 'bimodal'],
    commonMistakes: [
      'Assuming every dataset has exactly one mode',
      'Not recognizing bimodal or multimodal distributions',
      'Trying to use mean/median for purely categorical data'
    ],
    relatedFormulas: ['mean', 'median']
  },
  {
    id: 'variance',
    title: 'Sample Variance',
    category: 'Descriptive',
    latex: 's^2 = \\frac{\\sum_{i=1}^{n} (x_i - \\bar{x})^2}{n-1}',
    description: 'Variance measures how spread out data points are from the mean. It calculates the average of squared deviations from the mean. The denominator uses n-1 (Bessel\'s correction) for unbiased estimation of population variance from a sample.',
    whenToUse: 'Use variance when you need to quantify variability in your data, compare spread between groups, or when variance is needed for other calculations (e.g., ANOVA, regression). It is essential for statistical inference.',
    interpretation: 'Higher variance indicates more spread/variability in scores. Variance of 0 means all values are identical. Because it uses squared units, standard deviation (square root of variance) is often preferred for interpretation.',
    examples: [
      'Anxiety scores (0-40): 15, 20, 25, 30, 35. Mean = 25. Variance = [(15-25)² + (20-25)² + (25-25)² + (30-25)² + (35-25)²] / 4 = 250/4 = 62.5',
      'Compare therapy outcome variability: Group A variance = 25, Group B variance = 100. Group B has more heterogeneous outcomes.',
      'IQ scores in clinical sample: High variance (s² = 400) suggests diverse cognitive abilities; low variance (s² = 50) suggests homogeneous sample',
      'Pre/post treatment comparison: Reduced variance after treatment may indicate more consistent improvement across participants'
    ],
    difficulty: 'intermediate',
    keywords: ['spread', 'dispersion', 'squared deviation', 'variability', 'Bessel correction'],
    commonMistakes: [
      'Using n instead of n-1 for sample variance',
      'Forgetting that variance is in squared units (hard to interpret directly)',
      'Confusing variance with standard deviation'
    ],
    relatedFormulas: ['std-dev', 'mean', 'sem']
  },
  {
    id: 'std-dev',
    title: 'Standard Deviation',
    category: 'Descriptive',
    latex: 's = \\sqrt{\\frac{\\sum_{i=1}^{n} (x_i - \\bar{x})^2}{n-1}}',
    description: 'Standard deviation (SD) is the square root of variance. It measures the average distance of data points from the mean in the original units of measurement. In a normal distribution, about 68% of values fall within ±1 SD of the mean, 95% within ±2 SD.',
    whenToUse: 'Use SD whenever you report the mean, as it provides context about variability. Essential for calculating effect sizes (Cohen\'s d), confidence intervals, z-scores, and determining if scores are unusually high or low.',
    interpretation: 'SD = 0 means no variability. Larger SD indicates greater spread. For IQ tests (M=100, SD=15), a score of 130 is exactly 2 SDs above average, which is statistically unusual (top ~2.5%).',
    examples: [
      'BDI-II scores: Mean = 20, SD = 8. Most patients (68%) score between 12 and 28. Scores above 36 are unusually high (>2 SD).',
      'Reaction time study: Mean = 300ms, SD = 50ms. A participant with 450ms is 3 SDs above average—likely an outlier.',
      'Self-esteem scale (10-40): Mean = 28, SD = 5. Report as "M = 28, SD = 5" in your results section.',
      'Comparing treatment groups: "The CBT group (M = 15.2, SD = 4.1) showed lower anxiety than controls (M = 24.8, SD = 5.3)"'
    ],
    difficulty: 'intermediate',
    keywords: ['spread', 'dispersion', 'deviation', 'variability', '68-95-99.7 rule'],
    commonMistakes: [
      'Confusing SD with standard error (SE)',
      'Reporting SD without the mean (meaningless on its own)',
      'Using population formula (÷n) instead of sample formula (÷n-1)'
    ],
    relatedFormulas: ['variance', 'z-score', 'sem', 'effect-size-d']
  },
  {
    id: 'z-score',
    title: 'Z-Score (Standard Score)',
    category: 'Descriptive',
    latex: 'z = \\frac{x - \\mu}{\\sigma}',
    description: 'A z-score converts any score to a standardized scale with mean = 0 and SD = 1. It tells you how many standard deviations a score is above or below the mean, allowing comparisons across different scales or tests.',
    whenToUse: 'Use z-scores to compare scores from different tests (e.g., comparing anxiety vs. depression severity), identify outliers, determine percentile rankings, or standardize variables before analysis.',
    interpretation: 'z = 0 means the score equals the mean. z = +1 means 1 SD above average. z = -2 means 2 SDs below average. Using the z-table: z = 1.96 corresponds to the 97.5th percentile.',
    examples: [
      'Patient IQ = 130, Population M = 100, SD = 15. z = (130-100)/15 = +2.0 (top 2.3%, very superior range)',
      'Compare depression (BDI z = +1.5) vs. anxiety (BAI z = +0.8): Patient is more elevated on depression relative to norms.',
      'Identify outliers: Any z-score beyond ±3 is typically considered an extreme outlier worth investigating.',
      'Clinical cutoffs: If diagnosis threshold is z ≥ 1.5, and patient z = 1.2, they are below clinical threshold.',
      'Standardize before combining: Convert IQ and achievement scores to z-scores to compute an overall ability index.'
    ],
    difficulty: 'beginner',
    keywords: ['standardize', 'normalize', 'comparison', 'relative position', 'percentile'],
    commonMistakes: [
      'Using sample mean/SD when population parameters are known',
      'Forgetting z-scores assume normal distribution for percentile interpretation',
      'Not recognizing that z-scores are unitless'
    ],
    relatedFormulas: ['mean', 'std-dev', 'confidence-interval']
  },

  // CORRELATION
  {
    id: 'pearson-r',
    title: 'Pearson Correlation (r)',
    category: 'Correlation',
    latex: 'r = \\frac{\\sum_{i=1}^{n}(x_i - \\bar{x})(y_i - \\bar{y})}{\\sqrt{\\sum_{i=1}^{n}(x_i - \\bar{x})^2 \\sum_{i=1}^{n}(y_i - \\bar{y})^2}}',
    description: 'Pearson\'s r measures the strength and direction of the linear relationship between two continuous variables. It ranges from -1 (perfect negative) to +1 (perfect positive), with 0 indicating no linear relationship.',
    whenToUse: 'Use Pearson\'s r when both variables are continuous, linearly related, and approximately normally distributed. Appropriate for interval/ratio data like test scores, physiological measures, or time measurements.',
    interpretation: 'Sign indicates direction: positive r means variables increase together; negative r means one increases as the other decreases. Magnitude: |r| < 0.3 weak, 0.3-0.5 moderate, 0.5-0.7 strong, > 0.7 very strong.',
    examples: [
      'Sleep hours vs. cognitive performance: r = +0.65 indicates students who sleep more tend to perform better (strong positive).',
      'Anxiety vs. exam scores: r = -0.45 means higher anxiety is associated with lower scores (moderate negative).',
      'Depression vs. social support: r = -0.72 shows strong inverse relationship—more support, less depression.',
      'Treatment sessions vs. symptom reduction: r = +0.58 suggests attending more sessions relates to greater improvement.',
      'Age vs. reaction time: r = +0.40 indicates older participants tend to have slower reaction times.'
    ],
    difficulty: 'intermediate',
    keywords: ['linear', 'relationship', 'association', 'continuous', 'bivariate'],
    commonMistakes: [
      'Interpreting correlation as causation',
      'Using Pearson r for non-linear relationships (use Spearman)',
      'Ignoring outliers that can inflate or deflate r',
      'Not checking assumptions (normality, linearity, homoscedasticity)'
    ],
    relatedFormulas: ['spearman-rho', 'r-squared', 'regression']
  },
  {
    id: 'spearman-rho',
    title: 'Spearman\'s Rho (ρ)',
    category: 'Correlation',
    latex: '\\rho = 1 - \\frac{6\\sum d_i^2}{n(n^2-1)}',
    description: 'Spearman\'s correlation is a non-parametric measure that assesses the strength of the monotonic relationship between two variables using ranks instead of raw values. It is robust to outliers and does not assume normality.',
    whenToUse: 'Use Spearman\'s ρ when: data is ordinal (rankings), relationship is monotonic but not linear, data violates normality assumptions, or outliers are present. Preferred over Pearson for Likert scale data.',
    interpretation: 'Like Pearson r, ranges from -1 to +1. Measures consistency of direction (do ranks move together?). ρ = +0.80 means as one variable\'s rank increases, the other\'s rank tends to increase consistently.',
    examples: [
      'Patient satisfaction (1-5) vs. adherence ranking: ρ = +0.71 shows higher satisfaction relates to better adherence rankings.',
      'Therapist experience (ranked) vs. client outcomes (ranked): ρ = +0.55 indicates more experienced therapists tend to have better outcomes.',
      'Severity rating (mild/moderate/severe) vs. treatment duration: Use Spearman because severity is ordinal.',
      'Income (with extreme outliers) vs. therapy access: ρ is more appropriate than r due to outlier influence.',
      'Competition rankings (1st, 2nd, 3rd...) vs. practice hours: ρ = -0.68 means more practice relates to better (lower) rankings.'
    ],
    difficulty: 'intermediate',
    keywords: ['rank', 'ordinal', 'nonparametric', 'monotonic', 'robust'],
    commonMistakes: [
      'Using Spearman when Pearson is appropriate (wastes statistical power)',
      'Misunderstanding that d is the difference between ranks, not raw scores',
      'Assuming Spearman detects non-monotonic relationships (it doesn\'t)'
    ],
    relatedFormulas: ['pearson-r', 'r-squared']
  },
  {
    id: 'r-squared',
    title: 'Coefficient of Determination (R²)',
    category: 'Correlation',
    latex: 'R^2 = r^2 = \\frac{SS_{regression}}{SS_{total}} = \\frac{\\text{Explained Variance}}{\\text{Total Variance}}',
    description: 'R² represents the proportion of variance in the dependent variable that is explained or predicted by the independent variable(s). It converts correlation to a more intuitive measure of shared variance.',
    whenToUse: 'Use R² to communicate the practical significance of a relationship. While r describes strength, R² tells you what percentage of variability is accounted for. Essential in regression analysis and when comparing predictive models.',
    interpretation: 'R² ranges from 0 to 1 (0% to 100%). R² = 0.25 means 25% of variance in Y is explained by X; 75% remains unexplained by other factors. Multiply r by r to get R² (e.g., r = 0.5 → R² = 0.25).',
    examples: [
      'r = 0.60 between social support and wellbeing → R² = 0.36. Social support explains 36% of wellbeing variance.',
      'Childhood trauma (r = -0.50) and adult depression → R² = 0.25. Trauma accounts for 25% of depression variance.',
      'Multiple regression: R² = 0.45 means all predictors together explain 45% of outcome variance.',
      'Model comparison: Model A (R² = 0.30) vs. Model B (R² = 0.52). Model B explains 22% more variance.',
      'IQ predicting job performance: r = 0.40 → R² = 0.16. IQ explains only 16% of performance variability.'
    ],
    difficulty: 'intermediate',
    keywords: ['explained variance', 'proportion', 'prediction', 'regression', 'shared variance'],
    commonMistakes: [
      'Forgetting to square r to get R²',
      'Assuming high R² means causation',
      'Not reporting both r and R² for complete picture',
      'Ignoring adjusted R² in multiple regression (accounts for number of predictors)'
    ],
    relatedFormulas: ['pearson-r', 'regression']
  },

  // INFERENTIAL STATISTICS
  {
    id: 'sem',
    title: 'Standard Error of the Mean',
    category: 'Inferential',
    latex: 'SE_M = \\frac{s}{\\sqrt{n}}',
    description: 'The standard error of the mean (SEM) estimates the variability of sample means if you repeatedly sampled from the population. It reflects the precision of your sample mean as an estimate of the population mean.',
    whenToUse: 'Use SEM when reporting the precision of your mean estimate, calculating confidence intervals, or conducting hypothesis tests. Report SEM (not SD) when your research question concerns the population mean.',
    interpretation: 'Smaller SEM = more precise estimate. SEM decreases as sample size increases (√n in denominator). Note: SD describes sample spread; SEM describes sampling precision—they answer different questions.',
    examples: [
      'Depression study (n=100): Mean = 20, SD = 10. SEM = 10/√100 = 1.0. The true population mean is likely within ~2 points.',
      'Small sample (n=25): Same SD of 10 gives SEM = 10/√25 = 2.0. Less precision with smaller n.',
      'Confidence interval: 95% CI = Mean ± 1.96 × SEM. If Mean = 20, SEM = 1, then 95% CI = [18.04, 21.96].',
      'Comparing precision: Study A (n=400, SEM=0.5) is more precise than Study B (n=100, SEM=1.0).',
      'Error bars: Use SEM for error bars when showing precision of group means; use SD for showing data spread.'
    ],
    difficulty: 'beginner',
    keywords: ['sampling error', 'precision', 'estimate', 'confidence', 'sample size'],
    commonMistakes: [
      'Confusing SEM with SD (they measure different things)',
      'Using SEM when SD is appropriate (or vice versa)',
      'Not recognizing that SEM ≈ 0 with huge samples doesn\'t mean no variability'
    ],
    relatedFormulas: ['std-dev', 'confidence-interval']
  },
  {
    id: 'confidence-interval',
    title: '95% Confidence Interval',
    category: 'Inferential',
    latex: 'CI_{95\\%} = \\bar{x} \\pm t_{\\alpha/2} \\times SE_M \\quad \\text{(or } \\pm 1.96 \\times SE_M \\text{ for large n)}',
    description: 'A confidence interval provides a range of plausible values for a population parameter. The 95% CI means that if we repeated the study many times, 95% of the calculated intervals would contain the true population value.',
    whenToUse: 'Always report CIs alongside point estimates (means, differences). They convey both the effect estimate and its precision. Essential for determining statistical significance and practical importance.',
    interpretation: 'If 95% CI for a mean difference = [2.5, 7.3], the true effect is likely between 2.5 and 7.3 units. If a CI for difference includes zero, the effect is not statistically significant at p < .05.',
    examples: [
      'Treatment effect: Mean improvement = 8 points, 95% CI [5.2, 10.8]. We\'re 95% confident true effect is between 5.2 and 10.8 points.',
      'Correlation: r = 0.45, 95% CI [0.22, 0.64]. The true correlation is likely moderate but could range from weak to strong.',
      'Group difference: CBT vs. Control = 6 points, 95% CI [2.1, 9.9]. CI excludes 0, so difference is significant (p < .05).',
      'Non-significant result: Mean difference = 3, 95% CI [-1.5, 7.5]. CI includes 0, so not statistically significant.',
      'Narrow vs. wide CI: CI [10, 12] shows precise estimate; CI [5, 25] shows imprecise estimate (need larger n).'
    ],
    difficulty: 'intermediate',
    keywords: ['interval estimate', 'uncertainty', 'population parameter', 'range', 'precision'],
    commonMistakes: [
      'Saying "95% probability the true value is in this interval" (incorrect interpretation)',
      'Forgetting that CI width depends on sample size and variability',
      'Not using t-distribution for small samples (n < 30)',
      'Ignoring CIs and focusing only on p-values'
    ],
    relatedFormulas: ['sem', 'effect-size-d']
  },
  {
    id: 'effect-size-d',
    title: 'Cohen\'s d (Effect Size)',
    category: 'Inferential',
    latex: 'd = \\frac{\\bar{x}_1 - \\bar{x}_2}{s_p} \\quad \\text{where } s_p = \\sqrt{\\frac{(n_1-1)s_1^2 + (n_2-1)s_2^2}{n_1+n_2-2}}',
    description: 'Cohen\'s d is a standardized measure of the magnitude of difference between two groups. It expresses the difference in standard deviation units, allowing comparison across studies regardless of original measurement scale.',
    whenToUse: 'Always report effect sizes alongside significance tests. Use Cohen\'s d for comparing two group means. It answers "How big is the effect?" rather than just "Is there an effect?"',
    interpretation: 'Cohen\'s conventions: d = 0.2 (small), d = 0.5 (medium), d = 0.8 (large). In clinical psychology, d = 0.5 is often considered the minimum for clinical significance.',
    examples: [
      'CBT vs. waitlist for anxiety: M₁ = 15, M₂ = 25, pooled SD = 8. d = (25-15)/8 = 1.25 (very large effect).',
      'Medication vs. placebo: d = 0.35 (small-medium effect, may need large sample to detect).',
      'Pre-post therapy change: d = 0.75 (medium-large, clinically meaningful improvement).',
      'Meta-analysis summary: "Across 50 studies, the average effect of CBT for depression was d = 0.62 (95% CI: 0.48-0.76)."',
      'Power analysis: To detect d = 0.5 with 80% power at α = .05, need approximately 64 participants per group.'
    ],
    difficulty: 'intermediate',
    keywords: ['effect magnitude', 'practical significance', 'standardized difference', 'pooled SD'],
    commonMistakes: [
      'Not calculating pooled SD correctly',
      'Interpreting small p-value as large effect (they\'re independent)',
      'Using Cohen\'s benchmarks rigidly without context',
      'Forgetting sign indicates direction (positive = Group 1 higher)'
    ],
    relatedFormulas: ['t-test-ind', 'power', 'std-dev']
  },

  // STATISTICAL TESTS
  {
    id: 't-test-ind',
    title: 'Independent Samples t-test',
    category: 'Tests',
    latex: 't = \\frac{\\bar{x}_1 - \\bar{x}_2}{\\sqrt{\\frac{s_1^2}{n_1} + \\frac{s_2^2}{n_2}}}',
    description: 'The independent samples t-test compares means of two separate groups to determine if they differ significantly. It tests whether the observed difference is likely due to chance or reflects a true population difference.',
    whenToUse: 'Use when comparing means from two independent groups (e.g., treatment vs. control). Assumes approximately normal distributions and similar variances (homogeneity of variance). Use Welch\'s t-test if variances differ.',
    interpretation: 'Large |t| values suggest groups differ. Compare t to critical value or use p-value. If p < .05, reject null hypothesis that means are equal. Always report t, df, p, and effect size (d).',
    examples: [
      'CBT (n=30, M=18, SD=5) vs. Control (n=30, M=24, SD=6): Calculate t to test if CBT significantly reduces symptoms.',
      'Male vs. female stress levels: t(98) = 2.45, p = .016, d = 0.49. Females reported significantly higher stress.',
      'Online vs. in-person therapy outcomes: t(78) = -0.82, p = .41. No significant difference between modalities.',
      'Drug vs. placebo response: t(58) = 3.21, p = .002, d = 0.83. Drug shows significantly greater improvement.',
      'Reporting format: "The treatment group (M = 15.2, SD = 4.1) scored significantly lower than controls (M = 22.7, SD = 5.2), t(58) = 5.89, p < .001, d = 1.52."'
    ],
    difficulty: 'intermediate',
    keywords: ['two groups', 'mean comparison', 'independent', 'parametric', 'between-subjects'],
    commonMistakes: [
      'Using independent t-test for paired/matched data',
      'Ignoring homogeneity of variance assumption',
      'Not reporting effect size alongside t and p',
      'Conducting multiple t-tests instead of ANOVA (inflates Type I error)'
    ],
    relatedFormulas: ['t-test-paired', 'effect-size-d', 'anova-f']
  },
  {
    id: 't-test-paired',
    title: 'Paired Samples t-test',
    category: 'Tests',
    latex: 't = \\frac{\\bar{d}}{s_d / \\sqrt{n}}',
    description: 'The paired t-test compares means from the same participants measured at two time points or under two conditions. It analyzes the mean of the difference scores rather than comparing two independent groups.',
    whenToUse: 'Use for within-subjects designs: pre-post comparisons, matched pairs, or repeated measures with two conditions. More powerful than independent t-test because individual differences are controlled.',
    interpretation: 'Calculate d̄ (mean of difference scores) and sd (SD of differences). If t is significant, the change/difference is not due to chance. Effect size: d = d̄/sd.',
    examples: [
      'Pre-therapy (M=28) vs. Post-therapy (M=18) anxiety: Mean difference = -10. Test if this reduction is significant.',
      'Morning vs. evening cognitive performance: Each participant tested at both times, compare within-person.',
      'Placebo vs. drug phase (crossover design): Same patients in both conditions, paired analysis required.',
      'Reporting: "Anxiety significantly decreased from pre (M = 28.4, SD = 6.2) to post (M = 18.1, SD = 5.8), t(29) = 7.85, p < .001, d = 1.43."',
      'Non-significant: "Depression scores did not significantly change from Week 1 (M = 22.1) to Week 4 (M = 20.8), t(24) = 1.32, p = .20."'
    ],
    difficulty: 'intermediate',
    keywords: ['repeated measures', 'within-subjects', 'before-after', 'paired', 'difference scores'],
    commonMistakes: [
      'Using paired t-test for independent groups',
      'Forgetting that n is the number of pairs, not total measurements',
      'Not calculating the differences correctly (consistent direction: post - pre)',
      'Ignoring carryover effects in crossover designs'
    ],
    relatedFormulas: ['t-test-ind', 'effect-size-d']
  },
  {
    id: 'anova-f',
    title: 'One-Way ANOVA (F-ratio)',
    category: 'Tests',
    latex: 'F = \\frac{MS_{between}}{MS_{within}} = \\frac{SS_B / df_B}{SS_W / df_W}',
    description: 'One-way ANOVA tests whether means of three or more groups differ significantly. It partitions total variance into between-group and within-group components, comparing them via the F-ratio.',
    whenToUse: 'Use instead of multiple t-tests when comparing 3+ groups. Controls Type I error rate. If F is significant, follow up with post-hoc tests (Tukey, Bonferroni) to identify which groups differ.',
    interpretation: 'F > 1 suggests between-group variance exceeds within-group variance. Larger F = more likely groups differ. Check p-value; if significant, conduct post-hoc comparisons. Report η² for effect size.',
    examples: [
      'Compare 4 therapy types: CBT, DBT, Psychodynamic, Waitlist. F(3, 116) = 8.45, p < .001, η² = .18.',
      'Dosage levels (0mg, 50mg, 100mg, 150mg) effect on symptoms: One-way ANOVA with 4 groups.',
      'Age groups (Young, Middle, Old) and memory scores: F(2, 87) = 5.21, p = .007. Post-hoc: Young > Old.',
      'University departments and job satisfaction: F(4, 195) = 2.34, p = .056. Not significant, no post-hoc needed.',
      'Reporting: "A one-way ANOVA revealed significant differences in depression scores across treatment conditions, F(3, 96) = 12.38, p < .001, η² = .28. Tukey post-hoc tests showed CBT < Waitlist (p < .001)."'
    ],
    difficulty: 'advanced',
    keywords: ['multiple groups', 'between groups', 'variance ratio', 'omnibus', 'post-hoc'],
    commonMistakes: [
      'Interpreting significant F as meaning all groups differ (need post-hoc)',
      'Running multiple t-tests instead of ANOVA',
      'Ignoring homogeneity of variance assumption (use Welch ANOVA if violated)',
      'Not reporting effect size (η²)'
    ],
    relatedFormulas: ['t-test-ind', 'effect-size-d']
  },
  {
    id: 'chi-square',
    title: 'Chi-Square Test',
    category: 'Tests',
    latex: '\\chi^2 = \\sum \\frac{(O - E)^2}{E}',
    description: 'Chi-square (χ²) tests the association between two categorical variables (test of independence) or whether observed frequencies match expected frequencies (goodness of fit). It compares what you observed to what you\'d expect by chance.',
    whenToUse: 'Use for categorical/nominal data when examining relationships between groups. Test of independence: Is diagnosis related to treatment dropout? Goodness of fit: Do observed frequencies match population proportions?',
    interpretation: 'Larger χ² = greater difference between observed and expected. If p < .05, variables are significantly associated. Report effect size: Cramér\'s V (ranges 0-1).',
    examples: [
      'Diagnosis (Depression/Anxiety/PTSD) × Dropout (Yes/No): χ²(2) = 8.45, p = .015. Diagnosis is associated with dropout.',
      'Gender × Therapy preference (CBT/Psychodynamic/Other): χ²(2) = 3.21, p = .20. No significant association.',
      'Goodness of fit: Do clinical referrals match population proportions? Compare observed to expected frequencies.',
      'Treatment response (Improved/Not improved) × Medication type (A/B/C): χ²(2) = 12.67, p = .002, V = .28.',
      'Reporting: "A chi-square test of independence showed a significant association between treatment modality and remission status, χ²(2, N = 150) = 9.87, p = .007, Cramér\'s V = .26."'
    ],
    difficulty: 'intermediate',
    keywords: ['categorical', 'frequency', 'observed', 'expected', 'association', 'independence'],
    commonMistakes: [
      'Using χ² with expected frequencies < 5 (use Fisher\'s exact test)',
      'Forgetting that χ² tests association, not direction',
      'Not reporting degrees of freedom correctly (df = (rows-1)(cols-1))',
      'Using χ² for continuous data'
    ],
    relatedFormulas: ['pearson-r', 'spearman-rho']
  },
  {
    id: 'regression',
    title: 'Simple Linear Regression',
    category: 'Tests',
    latex: '\\hat{y} = b_0 + b_1 x \\quad \\text{where} \\quad b_1 = \\frac{\\sum(x_i - \\bar{x})(y_i - \\bar{y})}{\\sum(x_i - \\bar{x})^2}',
    description: 'Linear regression predicts values of a dependent variable (Y) from an independent variable (X). It finds the best-fitting line through the data, minimizing the sum of squared residuals (least squares method).',
    whenToUse: 'Use to predict outcomes, understand relationships, and quantify how much Y changes for each unit change in X. Extend to multiple regression for multiple predictors. Check assumptions: linearity, normality of residuals, homoscedasticity.',
    interpretation: 'b₀ (intercept) = predicted Y when X = 0. b₁ (slope) = change in Y for each 1-unit increase in X. R² = proportion of variance explained. Test if b₁ ≠ 0 to determine if X significantly predicts Y.',
    examples: [
      'Predict depression (Y) from social support (X): Depression = 35 - 2.5(Support). Each unit of support reduces depression by 2.5 points.',
      'Therapy sessions (X) predicting symptom reduction (Y): Reduction = 2 + 1.8(Sessions). Each session predicts 1.8 points improvement.',
      'Age predicting cognitive decline: Cognition = 100 - 0.5(Age). Model predicts 0.5-point decline per year.',
      'Stress (X) and cortisol (Y): b₁ = 3.2, p < .001. Stress significantly predicts cortisol; each stress unit increases cortisol by 3.2 units.',
      'Reporting: "Simple linear regression showed that social support significantly predicted wellbeing, b = 2.45, SE = 0.52, t(98) = 4.71, p < .001. Social support accounted for 18% of variance in wellbeing (R² = .18)."'
    ],
    difficulty: 'advanced',
    keywords: ['prediction', 'slope', 'intercept', 'linear model', 'least squares'],
    commonMistakes: [
      'Extrapolating beyond the data range',
      'Ignoring non-linear patterns (check residual plots)',
      'Confusing correlation with causation',
      'Not checking assumptions before interpreting results'
    ],
    relatedFormulas: ['pearson-r', 'r-squared']
  },
  {
    id: 'power',
    title: 'Statistical Power',
    category: 'Inferential',
    latex: 'Power = 1 - \\beta = P(\\text{reject } H_0 | H_1 \\text{ is true})',
    description: 'Statistical power is the probability of correctly detecting an effect when one truly exists. It is 1 minus the probability of a Type II error (β). Adequate power (typically ≥ .80) is essential for meaningful research.',
    whenToUse: 'Conduct power analysis BEFORE data collection to determine required sample size. Also use for post-hoc power to understand non-significant results (though this is controversial). Power depends on effect size, sample size, and alpha level.',
    interpretation: 'Power = .80 means 80% chance of detecting the effect if it exists. Low power = high risk of missing real effects. Power increases with: larger effect size, larger n, higher α level, lower variability.',
    examples: [
      'To detect d = 0.5 (medium) with 80% power at α = .05: Need ~64 participants per group for independent t-test.',
      'With n = 30 per group, power to detect d = 0.5 is only ~50%. Consider this before interpreting null results.',
      'Large effect (d = 0.8): Only ~26 per group needed for 80% power. Small effect (d = 0.2): Need ~394 per group!',
      'Correlation: To detect r = .30 with 80% power, need approximately n = 85.',
      'Non-significant result interpretation: "Given our sample size (n = 40), we had only 52% power to detect the expected effect (d = 0.4), so the null finding should be interpreted cautiously."'
    ],
    difficulty: 'advanced',
    keywords: ['type II error', 'beta', 'sample size', 'detection', 'a priori'],
    commonMistakes: [
      'Not conducting power analysis before data collection',
      'Using observed effect size for post-hoc power (circular reasoning)',
      'Ignoring power when interpreting non-significant results',
      'Assuming significant results have adequate power (they can be flukes)'
    ],
    relatedFormulas: ['effect-size-d', 't-test-ind']
  },
];

/**
 * Get formulas by category
 */
export function getFormulasByCategory(category: FormulaCategory): Formula[] {
  return formulas.filter(f => f.category === category);
}

/**
 * Get formula by ID
 */
export function getFormulaById(id: string): Formula | undefined {
  return formulas.find(f => f.id === id);
}

/**
 * Search formulas by keyword
 */
export function searchFormulas(query: string): Formula[] {
  const lowerQuery = query.toLowerCase().trim();
  if (!lowerQuery) return formulas;
  
  return formulas.filter(f => 
    f.title.toLowerCase().includes(lowerQuery) ||
    f.description.toLowerCase().includes(lowerQuery) ||
    f.keywords.some(k => k.toLowerCase().includes(lowerQuery)) ||
    f.category.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Get all unique categories
 */
export function getCategories(): FormulaCategory[] {
  return ['Descriptive', 'Correlation', 'Inferential', 'Tests'];
}
