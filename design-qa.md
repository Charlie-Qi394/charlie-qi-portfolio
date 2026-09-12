# Living Systems portfolio QA

final result: passed

## Visual target and evidence

- Selected visual: option 1, `exec-ee2697a4-fedd-4786-ba58-5dec0dcbb746.png` from the design session.
- Local reference: `/Users/charlieqi/.codex/generated_images/01a0945c-cf96-7783-8a70-d7ce4ec4ae39/exec-ee2697a4-fedd-4786-ba58-5dec0dcbb746.png`.
- Implementation: `http://127.0.0.1:4173/charlie-qi-portfolio/`.
- Full-view comparison: reference and `qa/desktop-final.png` opened together in one comparison tool result, both 1487 × 1058 pixels and CSS viewport, no density conversion.
- Final state: dark theme, page start, formulation flagship selected, blend at 30% concentrate / 24% protein.
- Mobile: `qa/mobile-home-final.png`, 390 × 844 pixels / CSS viewport, scroll 0; no horizontal overflow. `qa/mobile.png` also documents the formulation controls and project section.
- Supporting screenshot files remain local and gitignored.

## Findings and fixes

- [Resolved P2] Contact link lost contrast against the molecular artwork. Added an opaque dark backing; final desktop comparison confirms legibility.
- [Resolved P2] Mobile supporting text and GitHub link overlapped bright artwork. Reduced mobile artwork opacity, increased text contrast and added a dark link backing. Final mobile screenshot confirms readable content and visible CTA.
- [Resolved P2] Mobile home-anchor position could put the masthead behind fixed navigation. Added a mobile scroll margin and removed smooth-scroll timing ambiguity. Final mobile capture shows full masthead.
- No remaining actionable P0/P1/P2 findings.

## Required fidelity surfaces

- Typography: locally bundled Inter, bold two-line hero with tight tracking; supporting text uses lighter weights and clear hierarchy. Intentional wording corrections remove unverified generated claims.
- Layout: ivory navigation rail, dark hero, sage headline, right-side scientific artwork and divided featured-project region follow the selected composition. Mobile adapts the rail into a top navigation strip and stacks the flagship content.
- Colors: near-black #0b100e, ivory #f3f5f0 and sage #b2d4a4 preserve the target palette. Light theme keeps the dark hero and changes lower surfaces.
- Assets: original generated glass-molecule artwork, real existing portrait, locally bundled font and library icons. No rasterized page UI or invented scientific results. The artwork is decorative, not a protein-structure claim.
- Content: user requested formulation as flagship after selecting the concept. It is selected by default and first in the gallery. Job Application OS is supporting. All résumé links use email requests; no résumé download is exposed.

The full-view comparison was sufficient to assess the large hero typography and composition. Additional mobile screenshots and DOM text inspections resolved the smaller control/copy details. Generated concept project cards were intentionally replaced with working, labelled demonstrations; the formulation preview is an illustrative weighted mass balance, not the full optimiser.

## Interaction validation

- Formulation slider: 31% of an 80%-protein concentrate + 69% zero-protein base gives 24.8% blend protein.
- Job demo: Like → Pass → Like produces 2 liked / 3 reviewed and completion state; Try again resets the deck.
- Featured project switching updates the content and source destination.
- Project navigation and expandable engineering details work.
- Light/dark controls switch their accessible labels and theme.
- Résumé links inspected: email requests only; images load successfully.
- Browser error logs after correction: none.
- Production build passes. Public app source passed 41 tests and GitHub CI separately.

## Follow-up polish

- The new molecular asset uses a closer crop than the concept; this is a minor artistic variation.
- Copy-email uses the browser clipboard API; mailto remains the primary contact path. No real email was sent during validation.
