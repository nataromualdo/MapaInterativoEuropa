// Script para manipular o SVG já embutido no HTML
document.addEventListener('DOMContentLoaded', function() {
    // Carregar o SVG
    fetch('europe.svg')
        .then(response => response.text())
        .then(svgContent => {
            // Inserir o SVG no DOM
            document.getElementById('map-wrapper').innerHTML = svgContent;
            
            // Inicializar o SVG Pan Zoom
            const panZoomInstance = svgPanZoom('#map-wrapper svg', {
                zoomEnabled: true,
                controlIconsEnabled: false,
                fit: true,
                center: true,
                minZoom: 0.5,
                maxZoom: 10,
                zoomScaleSensitivity: 0.5
            });
            
            // Configurar botões de zoom
            document.getElementById('zoom-in').addEventListener('click', function() {
                panZoomInstance.zoomIn();
            });
            
            document.getElementById('zoom-out').addEventListener('click', function() {
                panZoomInstance.zoomOut();
            });
            
            document.getElementById('reset-zoom').addEventListener('click', function() {
                panZoomInstance.resetZoom();
                panZoomInstance.resetPan();
            });
            
            // Aplicar interatividade aos países
            aplicarInteratividade();
        })
        .catch(error => {
            console.error('Erro ao carregar SVG:', error);
            
            // Tentar carregar o SVG embutido diretamente
            const svgElement = document.querySelector('svg');
            if (svgElement) {
                // Inicializar o SVG Pan Zoom
                const panZoomInstance = svgPanZoom('#map-wrapper svg', {
                    zoomEnabled: true,
                    controlIconsEnabled: false,
                    fit: true,
                    center: true,
                    minZoom: 0.5,
                    maxZoom: 10,
                    zoomScaleSensitivity: 0.5
                });
                
                // Configurar botões de zoom
                document.getElementById('zoom-in').addEventListener('click', function() {
                    panZoomInstance.zoomIn();
                });
                
                document.getElementById('zoom-out').addEventListener('click', function() {
                    panZoomInstance.zoomOut();
                });
                
                document.getElementById('reset-zoom').addEventListener('click', function() {
                    panZoomInstance.resetZoom();
                    panZoomInstance.resetPan();
                });
                
                // Aplicar interatividade aos países
                aplicarInteratividade();
            }
        });
    
    // Função para aplicar interatividade aos países
    function aplicarInteratividade() {
        // Dados dos países extraídos da planilha
        const paisesData = {
            "Áustria": {
                "schengen": "Sim",
                "ue": "Sim",
                "permanencia": "Sem visto - 90 dias",
                "categoria": "verde"
            },
            "Albânia": {
                "schengen": "Não",
                "ue": "Não",
                "permanencia": "Sem visto - 90 dias",
                "categoria": "cinza"
            },
            "Alemanha": {
                "schengen": "Sim",
                "ue": "Sim",
                "permanencia": "Sem visto - 90 dias",
                "categoria": "verde"
            },
            "Andorra": {
                "schengen": "Não",
                "ue": "Não",
                "permanencia": "Sem visto - 90 dias",
                "categoria": "cinza"
            },
            "Armênia": {
                "schengen": "Não",
                "ue": "Não",
                "permanencia": "Visto necessário (pode ser obtido na chegada) - 120 dias",
                "categoria": "cinza"
            },
            "Azerbaijão": {
                "schengen": "Não",
                "ue": "Não",
                "permanencia": "Visto necessário (visto eletrônico disponível) - 30 dias",
                "categoria": "cinza"
            },
            "Bielorrússia (Belarus)": {
                "schengen": "Não",
                "ue": "Não",
                "permanencia": "Sem visto - 90 dias",
                "categoria": "cinza"
            },
            "Bulgária": {
                "schengen": "Sim",
                "ue": "Sim",
                "permanencia": "Sem visto - 90 dias",
                "categoria": "verde"
            },
            "Bélgica": {
                "schengen": "Sim",
                "ue": "Sim",
                "permanencia": "Sem visto - 90 dias",
                "categoria": "verde"
            },
            "Bósnia e Herzegovina": {
                "schengen": "Não",
                "ue": "Não",
                "permanencia": "Sem visto - 90 dias",
                "categoria": "cinza"
            },
            "Chipre": {
                "schengen": "Não",
                "ue": "Sim",
                "permanencia": "Sem visto - 90 dias",
                "categoria": "azul"
            },
            "Cidade do Vaticano": {
                "schengen": "Não",
                "ue": "Não",
                "permanencia": "Sem visto - 90 dias (segue regras da Itália/Schengen)",
                "categoria": "cinza"
            },
            "Croácia": {
                "schengen": "Sim",
                "ue": "Sim",
                "permanencia": "Sem visto - 90 dias",
                "categoria": "verde"
            },
            "Dinamarca": {
                "schengen": "Sim",
                "ue": "Sim",
                "permanencia": "Sem visto - 90 dias",
                "categoria": "verde"
            },
            "Eslováquia": {
                "schengen": "Sim",
                "ue": "Sim",
                "permanencia": "Sem visto - 90 dias",
                "categoria": "verde"
            },
            "Eslovênia": {
                "schengen": "Sim",
                "ue": "Sim",
                "permanencia": "Sem visto - 90 dias",
                "categoria": "verde"
            },
            "Espanha": {
                "schengen": "Sim",
                "ue": "Sim",
                "permanencia": "Sem visto - 90 dias",
                "categoria": "verde"
            },
            "Estônia": {
                "schengen": "Sim",
                "ue": "Sim",
                "permanencia": "Sem visto - 90 dias",
                "categoria": "verde"
            },
            "Finlândia": {
                "schengen": "Sim",
                "ue": "Sim",
                "permanencia": "Sem visto - 90 dias",
                "categoria": "verde"
            },
            "França": {
                "schengen": "Sim",
                "ue": "Sim",
                "permanencia": "Sem visto - 90 dias",
                "categoria": "verde"
            },
            "Geórgia": {
                "schengen": "Não",
                "ue": "Não",
                "permanencia": "Sem visto - 365 dias",
                "categoria": "cinza"
            },
            "Grécia": {
                "schengen": "Sim",
                "ue": "Sim",
                "permanencia": "Sem visto - 90 dias",
                "categoria": "verde"
            },
            "Hungria": {
                "schengen": "Sim",
                "ue": "Sim",
                "permanencia": "Sem visto - 90 dias",
                "categoria": "verde"
            },
            "Irlanda": {
                "schengen": "Não",
                "ue": "Sim",
                "permanencia": "Sem visto - 90 dias",
                "categoria": "azul"
            },
            "Islândia": {
                "schengen": "Sim",
                "ue": "Não",
                "permanencia": "Sem visto - 90 dias",
                "categoria": "marrom"
            },
            "Itália": {
                "schengen": "Sim",
                "ue": "Sim",
                "permanencia": "Sem visto - 90 dias",
                "categoria": "verde"
            },
            "Kosovo": {
                "schengen": "Não",
                "ue": "Não",
                "permanencia": "Sem visto - 90 dias",
                "categoria": "cinza"
            },
            "Letônia": {
                "schengen": "Sim",
                "ue": "Sim",
                "permanencia": "Sem visto - 90 dias",
                "categoria": "verde"
            },
            "Liechtenstein": {
                "schengen": "Sim",
                "ue": "Não",
                "permanencia": "Sem visto - 90 dias",
                "categoria": "marrom"
            },
            "Lituânia": {
                "schengen": "Sim",
                "ue": "Sim",
                "permanencia": "Sem visto - 90 dias",
                "categoria": "verde"
            },
            "Luxemburgo": {
                "schengen": "Sim",
                "ue": "Sim",
                "permanencia": "Sem visto - 90 dias",
                "categoria": "verde"
            },
            "Macedônia do Norte": {
                "schengen": "Não",
                "ue": "Não",
                "permanencia": "Sem visto - 90 dias",
                "categoria": "cinza"
            },
            "Malta": {
                "schengen": "Sim",
                "ue": "Sim",
                "permanencia": "Sem visto - 90 dias",
                "categoria": "verde"
            },
            "Moldávia": {
                "schengen": "Não",
                "ue": "Não",
                "permanencia": "Sem visto - 90 dias",
                "categoria": "cinza"
            },
            "Montenegro": {
                "schengen": "Não",
                "ue": "Não",
                "permanencia": "Sem visto - 90 dias",
                "categoria": "cinza"
            },
            "Mônaco": {
                "schengen": "Não",
                "ue": "Não",
                "permanencia": "Sem visto - 90 dias (segue regras da França/Schengen)",
                "categoria": "cinza"
            },
            "Noruega": {
                "schengen": "Sim",
                "ue": "Não",
                "permanencia": "Sem visto - 90 dias",
                "categoria": "marrom"
            },
            "Países Baixos": {
                "schengen": "Sim",
                "ue": "Sim",
                "permanencia": "Sem visto - 90 dias",
                "categoria": "verde"
            },
            "Polônia": {
                "schengen": "Sim",
                "ue": "Sim",
                "permanencia": "Sem visto - 90 dias",
                "categoria": "verde"
            },
            "Portugal": {
                "schengen": "Sim",
                "ue": "Sim",
                "permanencia": "Sem visto - 90 dias",
                "categoria": "verde"
            },
            "Reino Unido": {
                "schengen": "Não",
                "ue": "Não",
                "permanencia": "Sem visto - 180 dias",
                "categoria": "cinza"
            },
            "República Tcheca (Tchéquia)": {
                "schengen": "Sim",
                "ue": "Sim",
                "permanencia": "Sem visto - 90 dias",
                "categoria": "verde"
            },
            "Romênia": {
                "schengen": "Sim",
                "ue": "Sim",
                "permanencia": "Sem visto - 90 dias",
                "categoria": "verde"
            },
            "Rússia": {
                "schengen": "Não",
                "ue": "Não",
                "permanencia": "Visto necessário - 30 dias",
                "categoria": "cinza"
            },
            "San Marino": {
                "schengen": "Não",
                "ue": "Não",
                "permanencia": "Sem visto - 90 dias (segue regras da Itália/Schengen)",
                "categoria": "cinza"
            },
            "Suécia": {
                "schengen": "Sim",
                "ue": "Sim",
                "permanencia": "Sem visto - 90 dias",
                "categoria": "verde"
            },
            "Suíça": {
                "schengen": "Sim",
                "ue": "Não",
                "permanencia": "Sem visto - 90 dias",
                "categoria": "marrom"
            },
            "Sérvia": {
                "schengen": "Não",
                "ue": "Não",
                "permanencia": "Sem visto - 90 dias",
                "categoria": "cinza"
            },
            "Turquia": {
                "schengen": "Não",
                "ue": "Não",
                "permanencia": "Visto eletrônico - 90 dias",
                "categoria": "cinza"
            },
            "Ucrânia": {
                "schengen": "Não",
                "ue": "Não",
                "permanencia": "Sem visto - 90 dias",
                "categoria": "cinza"
            }
        };
        
        // Dicionário de tradução inglês -> português
        const traducoes = {
            'Albania': 'Albânia',
            'Andorra': 'Andorra',
            'Armenia': 'Armênia',
            'Austria': 'Áustria',
            'Belarus': 'Bielorrússia (Belarus)',
            'Belgium': 'Bélgica',
            'Bosnia and Herzegovina': 'Bósnia e Herzegovina',
            'Bulgaria': 'Bulgária',
            'Croatia': 'Croácia',
            'Cyprus': 'Chipre',
            'Czech Republic': 'República Tcheca (Tchéquia)',
            'Denmark': 'Dinamarca',
            'Estonia': 'Estônia',
            'Finland': 'Finlândia',
            'France': 'França',
            'Georgia': 'Geórgia',
            'Germany': 'Alemanha',
            'Greece': 'Grécia',
            'Hungary': 'Hungria',
            'Iceland': 'Islândia',
            'Ireland': 'Irlanda',
            'Italy': 'Itália',
            'Kosovo': 'Kosovo',
            'Latvia': 'Letônia',
            'Liechtenstein': 'Liechtenstein',
            'Lithuania': 'Lituânia',
            'Luxembourg': 'Luxemburgo',
            'Macedonia': 'Macedônia do Norte',
            'Moldova': 'Moldávia',
            'Montenegro': 'Montenegro',
            'Netherlands': 'Países Baixos',
            'Norway': 'Noruega',
            'Poland': 'Polônia',
            'Portugal': 'Portugal',
            'Romania': 'Romênia',
            'Serbia': 'Sérvia',
            'Slovakia': 'Eslováquia',
            'Slovenia': 'Eslovênia',
            'Spain': 'Espanha',
            'Sweden': 'Suécia',
            'Switzerland': 'Suíça',
            'Turkey': 'Turquia',
            'Ukraine': 'Ucrânia',
            'United Kingdom': 'Reino Unido'
        };
        
        // Configurar tooltip
        const tooltip = document.getElementById('tooltip');
        
        // Aplicar cores e interatividade aos países
        const svgElement = document.querySelector('svg');
        if (svgElement) {
            const paths = svgElement.querySelectorAll('path[id][name]');
            
            paths.forEach(path => {
                const svgName = path.getAttribute('name');
                const nomePT = traducoes[svgName];
                
                if (nomePT && paisesData[nomePT]) {
                    const dados = paisesData[nomePT];
                    
                    // Aplicar classe de cor conforme categoria (para hover)
                    path.classList.add(dados.categoria);
                    
                    // Adicionar eventos de mouse
                    path.addEventListener('mouseover', function(e) {
                        // Mostrar tooltip
                        tooltip.innerHTML = `
                            <h3>${nomePT}</h3>
                            <p><strong>União Europeia:</strong> ${dados.ue}</p>
                            <p><strong>Espaço Schengen:</strong> ${dados.schengen}</p>
                            <p><strong>Permanência para Brasileiros:</strong> ${dados.permanencia}</p>
                        `;
                        
                        tooltip.style.display = 'block';
                        moverTooltip(e);
                    });
                    
                    path.addEventListener('mousemove', function(e) {
                        // Mover tooltip com o mouse
                        moverTooltip(e);
                    });
                    
                    path.addEventListener('mouseout', function() {
                        // Esconder tooltip
                        tooltip.style.display = 'none';
                    });
                }
            });
        }
        
        // Função para mover tooltip com posicionamento inteligente
        function moverTooltip(event) {
            const mapContainer = document.querySelector('.map-container');
            const rect = mapContainer.getBoundingClientRect();
            
            // Posicionar o tooltip próximo ao cursor
            let x = event.clientX - rect.left + 15;
            let y = event.clientY - rect.top - 15;
            
            // Obter dimensões
            const tooltipWidth = tooltip.offsetWidth;
            const tooltipHeight = tooltip.offsetHeight;
            const containerWidth = mapContainer.offsetWidth;
            const containerHeight = mapContainer.offsetHeight;
            
            // Verificar se o tooltip sairia pela direita
            if (x + tooltipWidth > containerWidth - 20) {
                x = x - tooltipWidth - 30; // Posicionar à esquerda do cursor
            }
            
            // Verificar se o tooltip sairia por cima
            if (y - tooltipHeight < 10) {
                y = y + 30; // Posicionar abaixo do cursor
            }
            
            // Verificar se o tooltip sairia por baixo
            if (y + tooltipHeight > containerHeight - 10) {
                y = containerHeight - tooltipHeight - 10; // Fixar na parte inferior
            }
            
            // Aplicar posição
            tooltip.style.left = `${x}px`;
            tooltip.style.top = `${y}px`;
        }
    }
});
