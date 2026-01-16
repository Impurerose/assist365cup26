// World Cup 2026 - Main Application
// Auto-generated: 2026-01-16T18:56:23.480Z

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
      class="bg-white rounded-lg p-4 flex items-center gap-3 hover:shadow-md transition-shadow cursor-pointer"
    >
      <span class="text-3xl">${team.flag}</span>
      <span class="font-semibold text-gray-800">${team.name}</span>
    </button>
  `).join('');
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
    sidePanel.classList.remove('bg-[url(https://assistcdn.s3.us-west-1.amazonaws.com/assets/wc2026/BallWidthDots.svg)]');
  } else {
    initialState.classList.remove('hidden');
    selectedState.classList.add('hidden');
    sidePanel.classList.add('bg-[url(https://assistcdn.s3.us-west-1.amazonaws.com/assets/wc2026/BallWidthDots.svg)]');
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

  container.innerHTML = MOCK_MATCHES.map(match => `
    <div class="bg-white border border-[#C2DFFF] rounded-xl px-3 py-4 flex flex-col gap-4 relative">
      <div class="absolute right-[7px] top-[7px] w-5 h-5">
        <svg width="20" height="20" viewBox="0 0 20 20">
          <circle cx="10" cy="10" r="10" fill="#006FE8"/>
          <text x="10" y="14" text-anchor="middle" fill="white" class="text-xs font-semibold" style="font-family: 'Titillium Web', sans-serif;">${match.number}</text>
        </svg>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-xl">${match.team1.flag}</span>
        <p class="text-base font-semibold text-[#31363A]">${match.team1.name}</p>
        <p class="text-base font-semibold text-[#31363A]">-</p>
        <p class="text-base font-semibold text-[#31363A]">${match.team2.name}</p>
        <span class="text-xl">${match.team2.flag}</span>
      </div>
      <div class="flex flex-col gap-2">
        <div class="flex items-center gap-2">
          <i class="ph ph-calendar" style="font-size: 20px; color: #7BD0C2;"></i>
          <p class="text-base text-[#31363A]">${match.date}</p>
        </div>
        <div class="flex items-center gap-2">
          <i class="ph ph-map-pin" style="font-size: 20px; color: #7BD0C2;"></i>
          <p class="text-base text-[#31363A]">${match.city}</p>
        </div>
        <div class="flex items-center gap-2">
          <i class="ph ph-clock" style="font-size: 20px; color: #7BD0C2;"></i>
          <p class="text-base text-[#31363A]">${match.time.local} - ${match.time.venue}</p>
        </div>
      </div>
    </div>
  `).join('');
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
  initChipsNav();
});
