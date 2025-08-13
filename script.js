document.getElementById('tacForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const temperature = parseFloat(document.getElementById('temperature').value);
  const humidity = parseInt(document.getElementById('humidity').value);
  const exposition = document.getElementById('exposition').value;
  const combinaison = document.getElementById('combinaison').checked;
  const travail = document.getElementById('travail').value;

  const humiditeCorrections = {
    20: -2.0, 25: -1.0, 30: 0.0, 35: 0.9, 40: 1.8, 45: 2.7, 50: 3.5,
    55: 4.3, 60: 5.0, 65: 5.7, 70: 6.4, 75: 7.1, 80: 7.7, 85: 8.3, 90: 8.9
  };

  const expositionCorrections = {
    'mesure_soleil': 4.5,
    'mesure_ombre': 2.0,
    'mesure_interieur': 0.0,
    'meteo_soleil': 6.0,
    'meteo_ombre': 3.5
  };

  let closestHumidity = Object.keys(humiditeCorrections).reduce((prev, curr) =>
    Math.abs(curr - humidity) < Math.abs(prev - humidity) ? curr : prev
  );

  let tac = temperature + humiditeCorrections[closestHumidity] + expositionCorrections[exposition];
  if (combinaison) tac += 4.4;

  let zone = '';
  let classe = '';
  if (travail === 'leger') {
    if (tac <= 37.2) { zone = 'Zone verte'; classe = 'vert'; }
    else if (tac <= 40.6) { zone = 'Zone vert pâle'; classe = 'vert-pale'; }
    else if (tac <= 43.3) { zone = 'Zone jaune'; classe = 'jaune'; }
    else { zone = 'Zone rouge'; classe = 'rouge'; }
  } else if (travail === 'moyen') {
    if (tac <= 34.5) { zone = 'Zone verte'; classe = 'vert'; }
    else if (tac <= 37.2) { zone = 'Zone vert pâle'; classe = 'vert-pale'; }
    else if (tac <= 41.7) { zone = 'Zone jaune'; classe = 'jaune'; }
    else { zone = 'Zone rouge'; classe = 'rouge'; }
  } else if (travail === 'lourd') {
    if (tac <= 31.0) { zone = 'Zone verte'; classe = 'vert'; }
    else if (tac <= 35.6) { zone = 'Zone vert pâle'; classe = 'vert-pale'; }
    else if (tac <= 40.6) { zone = 'Zone jaune'; classe = 'jaune'; }
    else { zone = 'Zone rouge'; classe = 'rouge'; }
  }

  let hydratation = '';
  if (tac <= 38.9) hydratation = '1 verre toutes les 20 minutes';
  else if (tac <= 41.1) hydratation = '1 verre toutes les 15 minutes';
  else hydratation = '1 verre toutes les 10 minutes';

  const resultat = document.getElementById('resultat');
  resultat.className = classe;
  resultat.innerHTML =
    `🌡️ Température de l’air corrigée : ${tac.toFixed(1)} °C<br>` +
    `📊 ${zone}<br>` +
    `💧 Hydratation recommandée : ${hydratation}`;
});
