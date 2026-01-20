// World Cup 2026 - Main Application
// Auto-generated: 2026-01-20T18:26:53.352Z

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

  APP_STATE.map = new google.maps.Map(mapElement, {
    ...MAP_CONFIG,
    styles: MAP_STYLES_LOW_ZOOM
  });

  APP_STATE.map.addListener('zoom_changed', handleZoomChange);
  
  await createMarkers();
  console.log('✅ Map initialized');
};

function handleZoomChange() {
  const zoom = APP_STATE.map.getZoom();
  const styles = zoom > ZOOM_THRESHOLD ? MAP_STYLES_HIGH_ZOOM : MAP_STYLES_LOW_ZOOM;
  APP_STATE.map.setOptions({ styles });
}

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
    <div class="relative">
      <div class="w-14 h-14 rounded-full flex items-center justify-center border-3 border-white shadow-lg" style="background: linear-gradient(to bottom, #59D3C2, #006FE8);">
        <i class="ph-fill ph-soccer-ball text-white" style="font-size: 28px;"></i>
      </div>
      <div style="position:absolute;left:50%;transform:translateX(-50%);top:52px;width:0;height:0;border-left:8px solid transparent;border-right:8px solid transparent;border-top:12px solid #006FE8;"></div>
    </div>
    <div class="bg-white px-3 py-1 rounded-lg shadow-md">
      <span class="text-[#0059BA] font-bold text-sm whitespace-nowrap">${venue.name}</span>
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
  const select = document.getElementById('other-team-select');
  if (!select) return;

  select.innerHTML = '<option value="">Otro equipo</option>' + 
    TEAMS.map(t => `<option value="${t.id}">${t.flag} ${t.name}</option>`).join('');
  
  select.addEventListener('change', (e) => {
    if (e.target.value) {
      handleTeamSelect(e.target.value);
    }
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
  const teamSelect = document.getElementById('team-select');
  const citySelect = document.getElementById('city-select');

  if (teamSelect) {
    teamSelect.innerHTML = '<option value="">Seleccioná tu equipo</option>' + 
      TEAMS.map(t => `<option value="${t.id}" ${APP_STATE.selectedTeam?.id === t.id ? 'selected' : ''}>${t.flag} ${t.name}</option>`).join('');
  }

  if (citySelect) {
    citySelect.innerHTML = '<option value="">Seleccioná sede</option>' + 
      VENUES.map(v => `<option value="${v.id}">${v.name}</option>`).join('');
  }
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
      <div class="bg-[#0059BA] text-white text-sm font-normal px-2 py-1 rounded-full whitespace-nowrap" style="font-family: 'Titillium Web', sans-serif; line-height: 20px;">
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
    <div class="bg-white border border-[#C2DFFF] rounded-xl px-3 py-4 flex flex-col gap-4 relative overflow-visible">
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
        <p class="text-base font-semibold text-[#31363A]" style="font-family: 'Titillium Web', sans-serif;">${teamDisplay}</p>
        ${match.team2.flag ? `<span class="text-xl">${match.team2.flag}</span>` : flagPlaceholder}
      </div>
      <div class="flex flex-col gap-2">
        <div class="flex items-center gap-2">
          <i class="ph ph-calendar" style="font-size: 20px; color: #7BD0C2;"></i>
          <p class="text-base text-[#31363A]" style="font-family: 'Titillium Web', sans-serif;">${match.date}</p>
        </div>
        <div class="flex items-center gap-2">
          <i class="ph ph-map-pin" style="font-size: 20px; color: #7BD0C2;"></i>
          <p class="text-base text-[#31363A]" style="font-family: 'Titillium Web', sans-serif;">${match.city}</p>
        </div>
        <div class="flex items-center gap-2">
          <i class="ph ph-clock" style="font-size: 20px; color: #7BD0C2;"></i>
          <p class="text-base text-[#31363A]" style="font-family: 'Titillium Web', sans-serif;">${match.time.local} - ${match.time.venue}</p>
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
      <select id="position-select" class="w-full bg-white border border-border-primary rounded-xl p-3 text-base font-normal focus:outline-none focus:ring-2 focus:ring-border-primary">
        <option value="1st">Primer puesto</option>
        <option value="2nd">Segundo puesto</option>
        <option value="3rd">Tercer puesto</option>
        <option value="4th">Cuarto puesto</option>
      </select>
    </div>
  ` : '';
  
  return `
    <div class="flex gap-2 mb-6">
      <button 
        data-tab="groups" 
        class="border-2 ${initialTab === 'groups' ? 'border-[#006FE8] text-[#31363A]' : 'border-[#C2DFFF] text-[#70777C]'} font-semibold rounded-full px-4 py-[10px] text-lg transition-all duration-300 cursor-pointer"
        style="font-family: 'Titillium Web', sans-serif;"
      >
        Grupos
      </button>
      <button 
        data-tab="elimination" 
        class="border-2 ${initialTab === 'elimination' ? 'border-[#006FE8] text-[#31363A]' : 'border-[#C2DFFF] text-[#70777C]'} font-semibold rounded-full px-4 py-[10px] text-lg transition-all duration-300 cursor-pointer"
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
      <button class="border-2 border-[#C2DFFF] text-[#70777C] font-semibold rounded-full px-4 py-[10px] text-lg" style="font-family: 'Titillium Web', sans-serif;">
        Grupos
      </button>
      <button class="border-2 border-[#006FE8] text-[#31363A] font-semibold rounded-full px-4 py-[10px] text-lg" style="font-family: 'Titillium Web', sans-serif;">
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
          <button class="bg-[#BDEDE7] text-default hover:bg-[#A8E5DD] active:bg-[#93DDD3] focus:bg-[#BDEDE7] focus:ring-icon-lighter focus:ring-4 focus:outline-none w-full lg:w-fit px-4 py-[10px] h-[48px] text-lg font-semibold rounded-xl transition-all duration-300" style="font-family: 'Titillium Web', sans-serif;">
            Primeros
          </button>
          <button class="bg-[#BDEDE7] text-default hover:bg-[#A8E5DD] active:bg-[#93DDD3] focus:bg-[#BDEDE7] focus:ring-icon-lighter focus:ring-4 focus:outline-none w-full lg:w-fit px-4 py-[10px] h-[48px] text-lg font-semibold rounded-xl transition-all duration-300" style="font-family: 'Titillium Web', sans-serif;">
            Segundos
          </button>
          <button class="bg-[#BDEDE7] text-default hover:bg-[#A8E5DD] active:bg-[#93DDD3] focus:bg-[#BDEDE7] focus:ring-icon-lighter focus:ring-4 focus:outline-none w-full lg:w-fit px-4 py-[10px] h-[48px] text-lg font-semibold rounded-xl transition-all duration-300" style="font-family: 'Titillium Web', sans-serif;">
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
}

function initChipsNav() {
  const chips = document.querySelectorAll('#chips-nav button');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      APP_STATE.activeTab = chip.dataset.tab;
      chips.forEach(c => {
        if (c.dataset.tab === APP_STATE.activeTab) {
          c.classList.add('border-[#006FE8]', 'text-[#31363A]');
          c.classList.remove('border-[#C2DFFF]', 'text-[#70777C]');
        } else {
          c.classList.remove('border-[#006FE8]', 'text-[#31363A]');
          c.classList.add('border-[#C2DFFF]', 'text-[#70777C]');
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
});
