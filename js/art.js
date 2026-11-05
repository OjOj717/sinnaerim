/* 외부 이미지 요청 없이 표시되는 프로토타입용 SVG. 최종 캐릭터 그림으로 교체 가능. */
window.SIN_ART = {
  guide:`<svg viewBox="0 0 80 80" aria-hidden="true"><circle cx="40" cy="40" r="37" fill="#213335" stroke="#b7a47c" stroke-opacity=".4"/><path d="M20 70q2-27 20-28 18 1 20 28" fill="#8b9f91"/><ellipse cx="40" cy="31" rx="12" ry="15" fill="#c5bba5"/><path d="M24 30q0-20 16-20t16 20l-5 16-3-20-16-2-4 22z" fill="#102024"/><path d="M29 16l22-1M21 22l38-1" stroke="#d2b888" stroke-width="3"/><path d="M37 66L21 47q15-15 31 0z" fill="#d0be9c" stroke="#172629"/><path d="M37 65L27 47m10 18-2-21m2 21 8-20" stroke="#887b66"/></svg>`,
  scene(kind, compact=false) {
    const items={
      gate:`<path d="M109 236V114a71 71 0 01142 0v122"/><path d="M120 235V116a60 60 0 01120 0v119" opacity=".45"/><path d="M176 90v146m8-146v146M108 238h144"/><path d="M178 140l-45 99M182 140l45 99" opacity=".5"/><path d="M115 255L54 300m191-45 61 45" opacity=".35"/><circle cx="180" cy="109" r="5" fill="currentColor"/>`,
      door:`<path d="M112 237V70h136v167M124 232V83h110v149M185 85v149M125 131h109M125 183h109"/><circle cx="174" cy="161" r="3" fill="currentColor"/><path d="M107 244h146M93 255h174"/><path d="M73 177h19m-12-22 13 11M270 154l-12 12" opacity=".5"/>`,
      bridge:`<path d="M51 183q130-115 258 0M51 194q130-115 258 0M63 174v-35m32 16v-42m36 28v-42m98 40V96m35 59v-42m32 59v-35M59 146q57-64 102-65m38 0q58 4 101 65"/><path d="M153 141l12-9m29 1 13 8"/><path d="M38 226q30-12 60 0t60 0 60 0 60 0 50 0M66 244q30-12 60 0t60 0 60 0 50 0" opacity=".4"/>`,
      letter:`<path d="M91 110l89-43 89 43v121H91zM92 111l88 66 89-66M92 231l65-70m112 70-66-70"/><path d="M130 130V84h100v49M148 104h63m-63 15h48"/><path d="M180 251v16M163 263h34" opacity=".5"/>`,
      lights:`<path d="M46 93q133 65 268 0"/><path d="M89 110v31m91-14v40m90-54v29"/><rect x="74" y="141" width="30" height="47" rx="13"/><rect x="163" y="167" width="34" height="52" rx="14"/><rect x="255" y="142" width="30" height="47" rx="13"/><path d="M89 153v23m91 3v28m90-53v23M89 188v10m91 21v11m90-41v10"/><circle cx="180" cy="191" r="30" fill="currentColor" opacity=".06"/>`,
      bag:`<path d="M123 124q57 20 114 0l24 109q-81 31-162 0zM145 126l-16-46 45 4 8 43m4-1 15-61 35 20-19 42M132 142q48 15 96 0"/><path d="M160 165l41 49m-41 0 41-49M136 236l-12 21m97-21 11 21" opacity=".5"/>`,
      lantern:`<path d="M180 41v36M150 79h60M150 223h60M180 224v29"/><path d="M151 80q-57 71 0 143h58q57-71 0-143zM163 82q-27 71 0 139m34-139q27 71 0 139"/><path d="M135 115h90m-97 73h104" opacity=".5"/><circle cx="180" cy="151" r="18" fill="currentColor" opacity=".2"/>`
    };
    return `<svg class="scene-art ${compact?'compact':''}" viewBox="0 0 360 300" fill="none" aria-hidden="true"><defs><radialGradient id="halo"><stop stop-color="#d6bd89" stop-opacity=".14"/><stop offset="1" stop-color="#d6bd89" stop-opacity="0"/></radialGradient></defs><circle cx="180" cy="148" r="140" fill="url(#halo)"/><g stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${items[kind]||items.gate}<path d="M60 63h8m-4-4v8M287 55h7m-3.5-3.5v7M48 209h6m-3-3v6" opacity=".45"/></g><circle cx="272" cy="76" r="11" fill="currentColor" opacity=".7"/><circle cx="277" cy="72" r="10" fill="#15252a"/></svg>`;
  },
  deity(kind){
    const heads={
      wind:`<path d="M136 55h88M150 55v56l-12 10 13 7-13 12 14 11m16-96v73l-12 13 13 8-11 14m29-108v60l12 10-12 9 14 13m11-92v77l12 10-13 13"/>`,
      bowl:`<path d="M122 112h116q-12 43-58 43t-58-43zM163 155v8h34v-8"/><ellipse cx="180" cy="112" rx="57" ry="10"/><path d="M180 100c-40-11 8-35 0-59 30 33 34 55 0 59z" fill="currentColor" fill-opacity=".13"/>`,
      paper:`<path d="M139 56h82v101h-82zM139 56l41 26 41-26M139 157l41-27 41 27M180 82v48M139 100l41 14 41-14"/><path d="M150 67v76m60-76v76" opacity=".4"/>`,
      bottle:`<path d="M163 54h34v20l-7 9c4 8 30 22 30 45 0 35-80 35-80 0 0-23 26-37 30-45l-7-9z"/><path d="M159 55h42M162 71h36M152 124q28-12 56 0"/><circle cx="180" cy="126" r="13" fill="currentColor" fill-opacity=".15"/>`,
      scroll:`<path d="M132 59h96v91h-96zM132 59q-18 0-18 10t18 10M228 130q18 0 18 10t-18 10M134 59v89"/><path d="M155 82h49m-49 15h39m-39 15h49m-49 15h27" stroke="#c98a7a"/>`,
      hair:`<path d="M134 158V99q0-52 46-52t46 52v59l-12-12-11 16-13-12-10 16-12-16-11 12-11-16z" fill="currentColor" fill-opacity=".1"/><path d="M148 151V96q0-37 32-37t32 37v55M160 146V93q0-22 20-22t20 22v56M174 79v66m12-66v70"/>`
    };
    return `<svg class="deity-art" viewBox="0 0 360 300" fill="none" aria-hidden="true"><circle cx="180" cy="135" r="113" stroke="currentColor" stroke-opacity=".15"/><circle cx="180" cy="135" r="100" stroke="currentColor" stroke-opacity=".08" stroke-dasharray="2 8"/><g stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round"><path d="M150 169l-41 30-24 60 53-16 42 21 42-21 53 16-24-60-41-30M150 169l30 58 30-58M180 227v37M140 192l-7 49m87-49 7 49" fill="currentColor" fill-opacity=".05"/>${heads[kind]||heads.paper}<path d="M63 120h10m-5-5v10M281 183h10m-5-5v10" opacity=".55"/></g></svg>`;
  }
};
