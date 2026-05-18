const fs = require('fs');
['c:/Users/ISHAQ/Downloads/bca-project/CyberGuardAI-main/public/tools/security_posture_analyzer/assets/index-BvAz94CA.js', 'c:/Users/ISHAQ/Downloads/bca-project/CyberGuardAI-main/public/tools/security_posture_analyzer/assets/index-DDG39pR-.js'].forEach(path => {
    try {
        let content = fs.readFileSync(path, 'utf8');
        const target = '(0,z.jsx)(`section`,{className:`glass`,style:{marginTop:`60px`,padding:`40px`,display:`grid`,gridTemplateColumns:`repeat(auto-fit, minmax(200px, 1fr))`,textAlign:`center`,gap:`40px`},children:[{label:`Security Domains`,val:`8+`},{label:`Risk Factors`,val:`50+`},{label:`Compliance Frameworks`,val:`3`},{label:`Accuracy Rate`,val:`99.9%`}].map((e,t)=>(0,z.jsxs)(`div`,{children:[(0,z.jsx)(`div`,{style:{fontSize:`2.5rem`,fontWeight:800,color:`white`,marginBottom:`4px`},children:e.val}),(0,z.jsx)(`div`,{style:{color:`#64748b`,fontSize:`0.9rem`,textTransform:`uppercase`,letterSpacing:`0.05em`},children:e.label})]},t))})';
        content = content.replace(target, '');
        // also remove the preceding comma to avoid syntax error in array
        content = content.replace(',' + target, '');
        fs.writeFileSync(path, content);
        console.log('Fixed', path);
    } catch (e) {
        console.error(e);
    }
});
