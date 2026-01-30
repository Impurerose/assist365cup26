// World Cup 2026 - Main Application
// Auto-generated: 2026-01-30T18:17:17.972Z

const APP_STATE = {
  selectedTeam: null,
  selectedCity: null,
  activeTab: 'groups',
  map: null,
  markers: []
};

window.initMap = async function() {
  console.log('🗺️ Initializing Google Maps...');
  
  const mapElement = document.getElementById('map');
  if (!mapElement) {
    console.error('Map element not found');
    return;
  }

  APP_STATE.map = new google.maps.Map(mapElement, MAP_CONFIG);

  APP_STATE.map.addListener('zoom_changed', () => {
    console.log('Zoom level:', APP_STATE.map.getZoom());
  });
  
  await createMarkers();
  console.log('✅ Map initialized');
};

async function createMarkers() {
  const { AdvancedMarkerElement } = await google.maps.importLibrary('marker');

  VENUES.forEach(venue => {
    const content = createMarkerContent(venue);
    const marker = new AdvancedMarkerElement({
      map: APP_STATE.map,
      position: { lat: venue.lat, lng: venue.lng },
      content: content
    });

    marker.addListener('click', () => handleMarkerClick(venue));
    APP_STATE.markers.push({ marker, venue });
  });

  console.log(`✅ Created ${APP_STATE.markers.length} markers`);
}

function createMarkerContent(venue) {
  const container = document.createElement('div');
  container.className = 'flex flex-col items-center gap-2 cursor-pointer';
  container.innerHTML = `
    <img 
      src="https://assistcdn.s3.us-west-1.amazonaws.com/assets/wc2026/a365pin.svg" 
      alt="${venue.name}"
      class="w-auto h-auto"
    />
    <div class="px-3 py-1">
      <span class="text-text-decorative-darker font-bold text-sm whitespace-nowrap">${venue.name}</span>
    </div>
  `;
  return container;
}

function handleMarkerClick(venue) {
  console.log('📍 Clicked venue:', venue.name);
  APP_STATE.selectedCity = venue;
  APP_STATE.map.panTo({ lat: venue.lat, lng: venue.lng });
  APP_STATE.map.setZoom(10);
  
  const citySelect = document.getElementById('city-select');
  if (citySelect) citySelect.value = venue.id;
}

function populateTeamsGrid() {
  const grid = document.getElementById('teams-grid');
  if (!grid) return;

  grid.innerHTML = TEAMS.map(team => `
    <button 
      onclick="handleTeamSelect('${team.id}')"
      class="bg-white rounded-xl px-4 py-3 flex items-center gap-3 w-full lg:w-[150px] hover:shadow-md transition-shadow"
    >
      <span class="text-[32px] leading-none">${team.flag}</span>
      <span class="font-semibold text-default text-base">${team.name}</span>
    </button>
  `).join('');
}

function populateOtherTeamSelect() {
  initCustomSelect('other-team-select', TEAMS, 'Otro equipo', (option) => {
    handleTeamSelect(option.id);
  });
}

window.handleTeamSelect = function(teamId) {
  const team = TEAMS.find(t => t.id === teamId);
  if (!team) return;

  APP_STATE.selectedTeam = team;
  console.log('⚽ Selected team:', team.name);

  togglePanelState();
  showSelectionControls();
  populateMatchCards();
};

function togglePanelState() {
  const initialState = document.getElementById('initial-state');
  const selectedState = document.getElementById('selected-state');
  const sidePanel = document.getElementById('side-panel');

  if (APP_STATE.selectedTeam) {
    initialState.classList.add('hidden');
    selectedState.classList.remove('hidden');
    sidePanel.classList.remove('lg:bg-[url(https://assistcdn.s3.us-west-1.amazonaws.com/assets/wc2026/BallWidthDots.svg)]', 'bg-no-repeat', 'bg-top', 'bg-contain');
  } else {
    initialState.classList.remove('hidden');
    selectedState.classList.add('hidden');
    sidePanel.classList.add('lg:bg-[url(https://assistcdn.s3.us-west-1.amazonaws.com/assets/wc2026/BallWidthDots.svg)]', 'bg-no-repeat', 'bg-top', 'bg-contain');
  }
}

function showSelectionControls() {
  const controls = document.getElementById('selection-controls');
  if (!controls) return;
  controls.classList.remove('hidden');
  populateSelects();
}

function populateSelects() {
  initCustomSelect('team-select', TEAMS, 'Seleccioná tu equipo', (option) => {
    handleTeamSelect(option.id);
  }, APP_STATE.selectedTeam?.id);

  initCustomSelect('city-select', VENUES, 'Seleccioná sede', (option) => {
    APP_STATE.selectedCity = option;
    if (APP_STATE.map) {
      APP_STATE.map.panTo({ lat: option.lat, lng: option.lng });
      APP_STATE.map.setZoom(10);
    }
  });
}

/**
 * Initialize Tom Select on a select element
 * @param {string} selectId - ID of the select element
 * @param {Array} options - Array of options
 * @param {string} placeholder - Placeholder text
 * @param {Function} onChange - Callback when selection changes
 * @param {string|null} selectedValue - Initial selected value
 */
function initCustomSelect(selectId, options, placeholder, onChange, selectedValue = null) {
  const selectElement = document.getElementById(selectId);
  if (!selectElement) return;

  // Configure Tom Select
  const tomSelect = new TomSelect(`#${selectId}`, {
    valueField: 'id',
    labelField: 'name',
    searchField: 'name',
    options: options,
    placeholder: placeholder,
    create: false,
    maxItems: 1,
    allowEmptyOption: false,
    closeAfterSelect: true,
    
    // Custom rendering with flags
    render: {
      option: function(data, escape) {
        return `
          <div class="flex items-center gap-2 p-2">
            ${data.flag ? `<span class="text-xl">${data.flag}</span>` : ''}
            <span>${escape(data.name)}</span>
          </div>
        `;
      },
      item: function(data, escape) {
        return `
          <div class="flex items-center gap-2">
            ${data.flag ? `<span class="text-xl">${data.flag}</span>` : ''}
            <span>${escape(data.name)}</span>
          </div>
        `;
      }
    },
    
    // Handle selection change
    onChange: function(value) {
      if (!value) return;
      const selectedOption = options.find(opt => String(opt.id) === String(value));
      if (selectedOption && onChange) {
        onChange(selectedOption);
      }
    }
  });

  // Set initial value if provided
  if (selectedValue) {
    tomSelect.setValue(selectedValue, true);
  }

  return tomSelect;
}

function populateMatchCards() {
  const container = document.getElementById('match-cards');
  if (!container) return;

  container.innerHTML = MOCK_MATCHES.map(match => renderMatchCard(match)).join('');
}

function renderMatchCard(match) {
  const finishedBadge = match.finished ? `
    <div class="absolute right-8 -top-[6px]">
      <div class="bg-success-primary text-white text-sm font-normal px-2 py-1 rounded-full whitespace-nowrap" style="font-family: 'Titillium Web', sans-serif; line-height: 20px;">
        Finalizado
      </div>
    </div>
  ` : '';

  const phaseBadge = match.phase ? `
    <div class="absolute right-8 -top-[6px]">
      <div class="bg-bg-alt-secondary text-white text-sm font-normal px-2 py-1 rounded-full whitespace-nowrap" style="font-family: 'Titillium Web', sans-serif; line-height: 20px;">
        ${match.phase}
      </div>
    </div>
  ` : '';

  const teamDisplay = match.finished 
    ? `${match.team1.name} ${match.team1.score} - ${match.team2.score} ${match.team2.name}`
    : `${match.team1.name} - ${match.team2.name}`;

  const flagPlaceholder = `
    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="15" viewBox="0 0 21 15" fill="none">
      <path d="M19 0.5H2C1.17157 0.5 0.5 1.17157 0.5 2V13C0.5 13.8284 1.17157 14.5 2 14.5H19C19.8284 14.5 20.5 13.8284 20.5 13V2C20.5 1.17157 19.8284 0.5 19 0.5Z" fill="#DDDDDD" stroke="black" stroke-opacity="0.1"/>
    </svg>
  `;

  return `
    <div class="bg-white border border-border-primary rounded-xl px-3 py-4 flex flex-col gap-4 relative overflow-visible">
      <div class="absolute right-[7px] -top-[3px] w-5 h-5">
        <svg width="20" height="20" viewBox="0 0 20 20">
          <circle cx="10" cy="10" r="10" fill="#006FE8"/>
          <text x="10" y="14" text-anchor="middle" fill="white" class="text-xs font-semibold" style="font-family: 'Titillium Web', sans-serif;">${match.number}</text>
        </svg>
      </div>
      ${finishedBadge}
      ${phaseBadge}
      <div class="flex items-center gap-2">
        ${match.team1.flag ? `<span class="text-xl">${match.team1.flag}</span>` : flagPlaceholder}
        <p class="text-base font-semibold text-text-default" style="font-family: 'Titillium Web', sans-serif;">${teamDisplay}</p>
        ${match.team2.flag ? `<span class="text-xl">${match.team2.flag}</span>` : flagPlaceholder}
      </div>
      <div class="flex flex-col gap-2">
        <div class="flex items-start gap-4">
          <div class="flex items-center gap-2">
            <i class="ph ph-calendar" style="font-size: 20px; color: #7BD0C2;"></i>
            <p class="text-base text-text-default" style="font-family: 'Titillium Web', sans-serif;">${match.date}</p>
          </div>
          <div class="flex items-center gap-2">
            <i class="ph ph-map-pin" style="font-size: 20px; color: #7BD0C2;"></i>
            <p class="text-base text-text-default" style="font-family: 'Titillium Web', sans-serif;">${match.city}</p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <i class="ph ph-clock" style="font-size: 20px; color: #7BD0C2;"></i>
          <p class="text-base text-text-default" style="font-family: 'Titillium Web', sans-serif;">${match.time.local} - ${match.time.venue}</p>
        </div>
      </div>
    </div>
  `;
}

function renderMatchesContainer(matches, initialTab = 'groups') {
  const groupMatches = matches.filter(m => m.stage === 'groups');
  const eliminationMatches = matches.filter(m => m.stage === 'elimination');
  
  // Position selector para tab de eliminación
  const positionSelect = initialTab === 'elimination' ? `
    <div class="mb-4">
      <div class="relative pt-1 w-full">
        <div class="custom-select position-select">
          <div class="custom-select-selected bg-white border border-border-primary rounded-xl p-3 text-base font-normal flex items-center justify-between cursor-pointer" tabindex="0">
            <span class="select-value text-text-default">Primer puesto</span>
            <div class="select-chevron">
              <i class="ph-bold ph-caret-down" style="font-size: 20px; color: #31363A;"></i>
            </div>
          </div>
          <div class="custom-select-items bg-white z-50 w-full rounded-xl shadow-lg overflow-y-auto absolute mt-1 top-full hidden" style="max-height: 256px;">
            <div class="custom-select-item selected" data-value="1st">
              <span>Primer puesto</span>
            </div>
            <div class="custom-select-item" data-value="2nd">
              <span>Segundo puesto</span>
            </div>
            <div class="custom-select-item" data-value="3rd">
              <span>Tercer puesto</span>
            </div>
            <div class="custom-select-item" data-value="4th">
              <span>Cuarto puesto</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  ` : '';
  
  return `
    <div class="flex gap-2 mb-6">
      <button 
        data-tab="groups" 
        class="border-2 ${initialTab === 'groups' ? 'border-brand-primary text-text-default' : 'border-border-primary text-text-lighter'} font-semibold rounded-full px-4 py-[10px] text-lg transition-all duration-300 cursor-pointer"
        style="font-family: 'Titillium Web', sans-serif;"
      >
        Grupos
      </button>
      <button 
        data-tab="elimination" 
        class="border-2 ${initialTab === 'elimination' ? 'border-brand-primary text-text-default' : 'border-border-primary text-text-lighter'} font-semibold rounded-full px-4 py-[10px] text-lg transition-all duration-300 cursor-pointer"
        style="font-family: 'Titillium Web', sans-serif;"
      >
        Eliminación
      </button>
    </div>
    ${positionSelect}
    <div class="flex flex-col gap-3 pt-3 overflow-y-auto">
      ${(initialTab === 'groups' ? groupMatches : eliminationMatches).map(m => renderMatchCard(m)).join('')}
    </div>
  `;
}

function renderFinalPathBanner() {
  return `
    <div class="flex gap-2 mb-6">
      <button class="border-2 border-border-primary text-text-lighter font-semibold rounded-full px-4 py-[10px] text-lg" style="font-family: 'Titillium Web', sans-serif;">
        Grupos
      </button>
      <button class="border-2 border-brand-primary text-text-default font-semibold rounded-full px-4 py-[10px] text-lg" style="font-family: 'Titillium Web', sans-serif;">
        Eliminación
      </button>
    </div>
    <div class="bg-white border pb-8 border-border-primary rounded-xl p-4 flex flex-col gap-6 items-center w-full max-w-full">
      <div class="bg-brand-comp-lilac mt-4 rounded-full w-[50px] h-[50px] flex items-center justify-center">
        <i class="ph-duotone ph-trophy" style="font-size: 32px; color: #31319B;"></i>
      </div>
      <div class="flex flex-col gap-4 w-full">
        <p class="text-xl font-semibold text-default text-center leading-7" style="font-family: 'Titillium Web', sans-serif;">
          Mirá cómo sería el camino a la final
        </p>
        <p class="text-base text-default text-center leading-6" style="font-family: 'Titillium Web', sans-serif;">
          Si en la fase de grupos quedamos:
        </p>
        <div class="flex items-center justify-between lg:justify-center w-full gap-2">
          <button class="bg-action-alt-default text-default hover:bg-action-alt-hover active:bg-action-alt-pressed focus:bg-action-alt-default focus:ring-icon-lighter focus:ring-4 focus:outline-none w-full lg:w-fit px-4 py-[10px] h-[48px] text-lg font-semibold rounded-xl transition-all duration-300" style="font-family: 'Titillium Web', sans-serif;">
            Primeros
          </button>
          <button class="bg-action-alt-default text-default hover:bg-action-alt-hover active:bg-action-alt-pressed focus:bg-action-alt-default focus:ring-icon-lighter focus:ring-4 focus:outline-none w-full lg:w-fit px-4 py-[10px] h-[48px] text-lg font-semibold rounded-xl transition-all duration-300" style="font-family: 'Titillium Web', sans-serif;">
            Segundos
          </button>
          <button class="bg-action-alt-default text-default hover:bg-action-alt-hover active:bg-action-alt-pressed focus:bg-action-alt-default focus:ring-icon-lighter focus:ring-4 focus:outline-none w-full lg:w-fit px-4 py-[10px] h-[48px] text-lg font-semibold rounded-xl transition-all duration-300" style="font-family: 'Titillium Web', sans-serif;">
            Terceros
          </button>
        </div>
      </div>
    </div>
  `;
}

function renderPendingDefinitionBanner() {
  return `
    <div class="bg-white border border-border-primary rounded-xl px-4 py-8 flex flex-col gap-6 items-center">
      <div class="bg-brand-comp-lilac rounded-full w-[50px] h-[50px] flex items-center justify-center">
        <i class="ph-duotone ph-clock-countdown" style="font-size: 32px; color: #31319B;"></i>
      </div>
      <div class="flex flex-col gap-4 w-full text-center">
        <p class="text-xl font-semibold text-default leading-7" style="font-family: 'Titillium Web', sans-serif;">
          Todavía está por definirse
        </p>
        <p class="text-base text-default leading-6" style="font-family: 'Titillium Web', sans-serif;">
          Los partidos se definirán según los resultados de la etapa de grupos.
        </p>
      </div>
    </div>
  `;
}

function initPositionSelects() {
  document.querySelectorAll('.position-select').forEach(selectContainer => {
    const selectedDiv = selectContainer.querySelector('.custom-select-selected');
    const itemsDiv = selectContainer.querySelector('.custom-select-items');
    const valueSpan = selectContainer.querySelector('.select-value');

    // Toggle dropdown
    selectedDiv.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = !itemsDiv.classList.contains('hidden');
      
      // Close all other dropdowns
      document.querySelectorAll('.custom-select-items').forEach(dropdown => {
        dropdown.classList.add('hidden');
      });

      if (!isOpen) {
        itemsDiv.classList.remove('hidden');
      }
    });

    // Handle option selection
    itemsDiv.addEventListener('click', (e) => {
      const item = e.target.closest('.custom-select-item');
      if (!item) return;

      const value = item.dataset.value;
      
      // Update display
      valueSpan.textContent = item.querySelector('span').textContent;

      // Update selected state
      itemsDiv.querySelectorAll('.custom-select-item').forEach(i => i.classList.remove('selected'));
      item.classList.add('selected');

      // Close dropdown
      itemsDiv.classList.add('hidden');

      console.log('📊 Position selected:', value);
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!selectContainer.contains(e.target)) {
        itemsDiv.classList.add('hidden');
      }
    });
  });
}

function initAllSections() {
  // Section 2: All matches
  const section2 = document.getElementById('matches-section-2');
  if (section2) {
    section2.innerHTML = renderMatchesContainer(MOCK_MATCHES, 'groups');
  }

  // Section 3: Final Path Banner
  const section3 = document.getElementById('final-path-banner');
  if (section3) {
    section3.innerHTML = renderFinalPathBanner();
  }

  // Section 4: Matches without pending (elimination tab)
  const section4 = document.getElementById('matches-section-4');
  if (section4) {
    section4.innerHTML = renderMatchesContainer(MOCK_MATCHES_WITHOUT_PENDING, 'elimination');
  }

  // Section 5: Pending Definition Banner
  const section5 = document.getElementById('pending-banner');
  if (section5) {
    section5.innerHTML = renderPendingDefinitionBanner();
  }

  // Section 6: Finished Matches
  const section6 = document.getElementById('matches-finished');
  if (section6) {
    section6.innerHTML = renderMatchesContainer(MOCK_MATCHES_FINISHED, 'groups');
  }

  // Initialize position selects after rendering
  initPositionSelects();
}

function initChipsNav() {
  const chips = document.querySelectorAll('#chips-nav button');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      APP_STATE.activeTab = chip.dataset.tab;
      chips.forEach(c => {
        if (c.dataset.tab === APP_STATE.activeTab) {
          c.classList.add('border-brand-primary', 'text-text-default');
          c.classList.remove('border-border-primary', 'text-text-lighter');
        } else {
          c.classList.remove('border-brand-primary', 'text-text-default');
          c.classList.add('border-border-primary', 'text-text-lighter');
        }
      });
      console.log('📑 Tab:', APP_STATE.activeTab);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 World Cup 2026 Map - Vanilla Edition');
  populateTeamsGrid();
  populateOtherTeamSelect();
  initChipsNav();
  initAllSections();
  populateSelects(); // Initialize selection controls on page load
});
