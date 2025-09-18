// ===== PRELOADER =====
document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    window.addEventListener('load', function() {
        const preloader = document.querySelector('.preloader');
        setTimeout(() => {
            preloader.style.opacity = 0;
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 400);
        }, 500);
    });

    // ===== PARTICLES.JS CONFIG =====
    // Initialize Particles.js
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#6c63ff"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": false,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#6c63ff",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    }

    // ===== THREE.JS PORTAL EFFECT =====
    if (typeof THREE !== 'undefined') {
        const portalContainer = document.getElementById('portal-3d');
        
        if (portalContainer) {
            const width = window.innerWidth;
            const height = window.innerHeight;
            
            // Create scene
            const scene = new THREE.Scene();
            
            // Create camera
            const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
            camera.position.z = 5;
            
            // Create renderer
            const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
            renderer.setSize(width, height);
            renderer.setPixelRatio(window.devicePixelRatio);
            portalContainer.appendChild(renderer.domElement);
            
            // Create portal geometry
            const portalGeometry = new THREE.TorusGeometry(3, 0.5, 16, 100);
            const portalMaterial = new THREE.MeshBasicMaterial({ 
                color: 0x6c63ff,
                wireframe: true,
                transparent: true,
                opacity: 0.5
            });
            const portalRing = new THREE.Mesh(portalGeometry, portalMaterial);
            scene.add(portalRing);
            
            // Create inner portal
            const portalDiscGeometry = new THREE.CircleGeometry(2.5, 32);
            const portalDiscMaterial = new THREE.MeshBasicMaterial({ 
                color: 0x6c63ff,
                transparent: true,
                opacity: 0.2
            });
            const portalDisc = new THREE.Mesh(portalDiscGeometry, portalDiscMaterial);
            scene.add(portalDisc);
            
            // Create particles
            const particlesGeometry = new THREE.BufferGeometry();
            const particlesCount = 1000;
            
            const posArray = new Float32Array(particlesCount * 3);
            
            for(let i = 0; i < particlesCount * 3; i++) {
                posArray[i] = (Math.random() - 0.5) * 10;
            }
            
            particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
            
            const particlesMaterial = new THREE.PointsMaterial({
                size: 0.02,
                color: 0x6c63ff,
                transparent: true,
                blending: THREE.AdditiveBlending
            });
            
            const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
            scene.add(particlesMesh);
            
            // Animation
            function animate() {
                requestAnimationFrame(animate);
                
                portalRing.rotation.x += 0.001;
                portalRing.rotation.y += 0.003;
                
                particlesMesh.rotation.y += 0.001;
                
                // Pulsating effect for portal
                const pulseFactor = (Math.sin(Date.now() * 0.001) + 1) * 0.1 + 0.8;
                portalDisc.scale.set(pulseFactor, pulseFactor, 1);
                
                renderer.render(scene, camera);
            }
            
            // Handle window resize
            window.addEventListener('resize', function() {
                const width = window.innerWidth;
                const height = window.innerHeight;
                renderer.setSize(width, height);
                camera.aspect = width / height;
                camera.updateProjectionMatrix();
            });
            
            animate();
        }
        
        // ===== 3D SKILLS VISUALIZATION =====
        const skillsContainer = document.getElementById('skills-3d-visualization');
        
        if (skillsContainer) {
            const width = skillsContainer.clientWidth;
            const height = skillsContainer.clientHeight;
            
            // Create scene
            const scene = new THREE.Scene();
            
            // Create camera
            const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
            camera.position.z = 30;
            
            // Create renderer
            const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
            renderer.setSize(width, height);
            renderer.setPixelRatio(window.devicePixelRatio);
            skillsContainer.appendChild(renderer.domElement);
            
            // Create skill nodes
            const skills = [
                { name: 'HTML', size: 1.5, color: 0xe44d26, x: -10, y: 5, z: 0 },
                { name: 'CSS', size: 1.5, color: 0x1572b6, x: -6, y: 3, z: -5 },
                { name: 'JavaScript', size: 2, color: 0xf7df1e, x: 0, y: 0, z: 0 },
                { name: 'React', size: 1.8, color: 0x61dafb, x: 6, y: -3, z: -5 },
                { name: 'Three.js', size: 1.7, color: 0x6c63ff, x: 10, y: -5, z: 0 },
                { name: 'WebGL', size: 1.6, color: 0xff6b6b, x: 7, y: 5, z: -10 },
                { name: 'Node.js', size: 1.5, color: 0x43853d, x: -7, y: -5, z: -10 },
                { name: 'AI', size: 1.9, color: 0x00d9ff, x: -4, y: -2, z: 5 },
                { name: 'Blockchain', size: 1.7, color: 0xf7931a, x: 4, y: 2, z: 5 }
            ];
            
            // Create nodes
            const nodes = [];
            const nodeGroups = [];
            
            skills.forEach(skill => {
                const nodeGeometry = new THREE.SphereGeometry(skill.size, 32, 32);
                const nodeMaterial = new THREE.MeshBasicMaterial({ 
                    color: skill.color,
                    wireframe: true,
                    transparent: true,
                    opacity: 0.7
                });
                
                const nodeMesh = new THREE.Mesh(nodeGeometry, nodeMaterial);
                nodeMesh.position.set(skill.x, skill.y, skill.z);
                
                const nodeGroup = new THREE.Group();
                nodeGroup.add(nodeMesh);
                
                // Add pulsating inner sphere
                const innerGeometry = new THREE.SphereGeometry(skill.size * 0.6, 32, 32);
                const innerMaterial = new THREE.MeshBasicMaterial({ 
                    color: skill.color,
                    transparent: true,
                    opacity: 0.5
                });
                
                const innerMesh = new THREE.Mesh(innerGeometry, innerMaterial);
                nodeGroup.add(innerMesh);
                
                scene.add(nodeGroup);
                nodes.push(nodeMesh);
                nodeGroups.push(nodeGroup);
            });
            
            // Create connections between nodes
            const connections = [];
            
            for(let i = 0; i < nodes.length; i++) {
                for(let j = i + 1; j < nodes.length; j++) {
                    if (Math.random() > 0.5) { // Not all nodes are connected
                        const startVector = new THREE.Vector3(
                            nodes[i].position.x,
                            nodes[i].position.y,
                            nodes[i].position.z
                        );
                        
                        const endVector = new THREE.Vector3(
                            nodes[j].position.x,
                            nodes[j].position.y,
                            nodes[j].position.z
                        );
                        
                        const connectionGeometry = new THREE.BufferGeometry().setFromPoints([startVector, endVector]);
                        const connectionMaterial = new THREE.LineBasicMaterial({ 
                            color: 0x6c63ff, 
                            transparent: true,
                            opacity: 0.3 
                        });
                        
                        const connectionLine = new THREE.Line(connectionGeometry, connectionMaterial);
                        scene.add(connectionLine);
                        connections.push({
                            line: connectionLine,
                            start: i,
                            end: j
                        });
                    }
                }
            }
            
            // Animation
            function animate() {
                requestAnimationFrame(animate);
                
                nodeGroups.forEach((node, index) => {
                    // Rotate nodes
                    node.rotation.x += 0.01;
                    node.rotation.y += 0.01;
                    
                    // Floating animation
                    const time = Date.now() * 0.001;
                    const floatY = Math.sin(time + index) * 0.1;
                    node.position.y += floatY / 10;
                    
                    // Pulsating effect
                    const pulseFactor = (Math.sin(time * 2 + index) + 1) * 0.1 + 0.8;
                    node.children[1].scale.set(pulseFactor, pulseFactor, pulseFactor);
                });
                
                // Update connections
                connections.forEach(connection => {
                    const startPos = nodes[connection.start].parent.position;
                    const endPos = nodes[connection.end].parent.position;
                    
                    const points = [
                        new THREE.Vector3(
                            startPos.x + nodes[connection.start].position.x,
                            startPos.y + nodes[connection.start].position.y,
                            startPos.z + nodes[connection.start].position.z
                        ),
                        new THREE.Vector3(
                            endPos.x + nodes[connection.end].position.x,
                            endPos.y + nodes[connection.end].position.y,
                            endPos.z + nodes[connection.end].position.z
                        )
                    ];
                    
                    connection.line.geometry.setFromPoints(points);
                });
                
                // Rotate entire scene slowly
                scene.rotation.y += 0.001;
                
                renderer.render(scene, camera);
            }
            
            // Handle window resize
            window.addEventListener('resize', function() {
                const width = skillsContainer.clientWidth;
                const height = skillsContainer.clientHeight;
                renderer.setSize(width, height);
                camera.aspect = width / height;
                camera.updateProjectionMatrix();
            });
            
            animate();
        }
        
        // ===== 3D PROJECT PREVIEW =====
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach((card, index) => {
            const previewContainer = card.querySelector('.project-3d-container');
            
            if (previewContainer) {
                const width = previewContainer.clientWidth;
                const height = previewContainer.clientHeight;
                
                // Create scene
                const scene = new THREE.Scene();
                
                // Create camera
                const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
                camera.position.z = 5;
                
                // Create renderer
                const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
                renderer.setSize(width, height);
                renderer.setPixelRatio(window.devicePixelRatio);
                previewContainer.appendChild(renderer.domElement);
                
                // Create different 3D objects for each project
                let mesh;
                
                switch(index % 6) {
                    case 0: // Cube
                        const geometry1 = new THREE.BoxGeometry(2, 2, 2);
                        const material1 = new THREE.MeshNormalMaterial();
                        mesh = new THREE.Mesh(geometry1, material1);
                        break;
                    case 1: // Sphere
                        const geometry2 = new THREE.SphereGeometry(1.5, 32, 32);
                        const material2 = new THREE.MeshNormalMaterial();
                        mesh = new THREE.Mesh(geometry2, material2);
                        break;
                    case 2: // Torus
                        const geometry3 = new THREE.TorusGeometry(1, 0.5, 16, 100);
                        const material3 = new THREE.MeshNormalMaterial();
                        mesh = new THREE.Mesh(geometry3, material3);
                        break;
                    case 3: // Tetrahedron
                        const geometry4 = new THREE.TetrahedronGeometry(1.5, 0);
                        const material4 = new THREE.MeshNormalMaterial();
                        mesh = new THREE.Mesh(geometry4, material4);
                        break;
                    case 4: // Icosahedron
                        const geometry5 = new THREE.IcosahedronGeometry(1.5, 0);
                        const material5 = new THREE.MeshNormalMaterial();
                        mesh = new THREE.Mesh(geometry5, material5);
                        break;
                    case 5: // Octahedron
                        const geometry6 = new THREE.OctahedronGeometry(1.5, 0);
                        const material6 = new THREE.MeshNormalMaterial();
                        mesh = new THREE.Mesh(geometry6, material6);
                        break;
                }
                
                scene.add(mesh);
                
                // Animation
                function animate() {
                    requestAnimationFrame(animate);
                    
                    mesh.rotation.x += 0.01;
                    mesh.rotation.y += 0.01;
                    
                    renderer.render(scene, camera);
                }
                
                // Handle card hover
                card.addEventListener('mouseenter', function() {
                    previewContainer.style.height = '150px';
                    renderer.setSize(previewContainer.clientWidth, 150);
                    camera.aspect = previewContainer.clientWidth / 150;
                    camera.updateProjectionMatrix();
                });
                
                card.addEventListener('mouseleave', function() {
                    previewContainer.style.height = '0';
                });
                
                animate();
            }
        });
        
        // ===== NEURAL NETWORK VISUALIZATION =====
        const neuralNetCanvas = document.getElementById('neural-net-canvas');
        
        if (neuralNetCanvas) {
            const ctx = neuralNetCanvas.getContext('2d');
            
            // Set canvas size
            neuralNetCanvas.width = neuralNetCanvas.parentElement.clientWidth;
            neuralNetCanvas.height = neuralNetCanvas.parentElement.clientHeight;
            
            // Neural network parameters
            const layers = [4, 6, 8, 6, 2]; // Number of neurons per layer
            const layerDist = neuralNetCanvas.width / (layers.length + 1);
            const nodeRadius = 10;
            const activeColor = '#6c63ff';
            const inactiveColor = '#333';
            
            // Neural network nodes
            const nodes = [];
            
            // Create nodes
            layers.forEach((nodeCount, layerIndex) => {
                const x = layerDist * (layerIndex + 1);
                const nodeList = [];
                
                for(let i = 0; i < nodeCount; i++) {
                    const layerHeight = nodeCount * (nodeRadius * 2 + 10);
                    const startY = (neuralNetCanvas.height - layerHeight) / 2;
                    const y = startY + i * (nodeRadius * 2 + 10) + nodeRadius;
                    
                    nodeList.push({
                        x,
                        y,
                        active: Math.random() > 0.5, // Random initial activation
                        connections: []
                    });
                }
                
                nodes.push(nodeList);
            });
            
            // Create connections
            for(let i = 0; i < nodes.length - 1; i++) {
                const currentLayer = nodes[i];
                const nextLayer = nodes[i + 1];
                
                currentLayer.forEach(node => {
                    nextLayer.forEach(nextNode => {
                        node.connections.push({
                            target: nextNode,
                            weight: Math.random(),
                            signalPosition: 0,
                            signalActive: false,
                            signalSpeed: 0.01 + Math.random() * 0.02
                        });
                    });
                });
            }
            
            // Animation
            function animateNeuralNet() {
                requestAnimationFrame(animateNeuralNet);
                
                // Clear canvas
                ctx.clearRect(0, 0, neuralNetCanvas.width, neuralNetCanvas.height);
                
                // Draw connections
                nodes.forEach(layer => {
                    layer.forEach(node => {
                        node.connections.forEach(conn => {
                            // Calculate line parameters
                            const startX = node.x;
                            const startY = node.y;
                            const endX = conn.target.x;
                            const endY = conn.target.y;
                            
                            // Draw connection line
                            ctx.beginPath();
                            ctx.moveTo(startX, startY);
                            ctx.lineTo(endX, endY);
                            
                            // Determine color based on weight
                            const opacity = Math.max(0.1, conn.weight);
                            ctx.strokeStyle = `rgba(108, 99, 255, ${opacity})`;
                            ctx.lineWidth = Math.max(1, conn.weight * 3);
                            ctx.stroke();
                            
                            // Draw signal if active
                            if (node.active && conn.signalActive) {
                                conn.signalPosition += conn.signalSpeed;
                                
                                if (conn.signalPosition > 1) {
                                    conn.signalPosition = 0;
                                    conn.target.active = true;
                                }
                                
                                const signalX = startX + (endX - startX) * conn.signalPosition;
                                const signalY = startY + (endY - startY) * conn.signalPosition;
                                
                                // Draw signal
                                ctx.beginPath();
                                ctx.arc(signalX, signalY, 4, 0, Math.PI * 2);
                                ctx.fillStyle = '#00d9ff';
                                ctx.fill();
                            }
                            
                            // Randomly activate signals
                            if (node.active && Math.random() < 0.01) {
                                conn.signalActive = true;
                            }
                        });
                    });
                });
                
                // Draw nodes
                nodes.forEach(layer => {
                    layer.forEach(node => {
                        // Draw node circle
                        ctx.beginPath();
                        ctx.arc(node.x, node.y, nodeRadius, 0, Math.PI * 2);
                        ctx.fillStyle = node.active ? activeColor : inactiveColor;
                        ctx.fill();
                        
                        // Draw node ring
                        ctx.beginPath();
                        ctx.arc(node.x, node.y, nodeRadius + 2, 0, Math.PI * 2);
                        ctx.strokeStyle = '#6c63ff';
                        ctx.lineWidth = 1;
                        ctx.stroke();
                        
                        // Randomly deactivate nodes
                        if (node.active && Math.random() < 0.005) {
                            node.active = false;
                        }
                    });
                });
            }
            
            // Add network controls
            const addNodeBtn = document.getElementById('add-node');
            const removeNodeBtn = document.getElementById('remove-node');
            const trainNetworkBtn = document.getElementById('train-network');
            
            if (addNodeBtn) {
                addNodeBtn.addEventListener('click', function() {
                    // Add node to middle layer
                    const middleLayer = Math.floor(layers.length / 2);
                    
                    const layerHeight = (nodes[middleLayer].length + 1) * (nodeRadius * 2 + 10);
                    const startY = (neuralNetCanvas.height - layerHeight) / 2;
                    const y = startY + nodes[middleLayer].length * (nodeRadius * 2 + 10) + nodeRadius;
                    
                    const newNode = {
                        x: layerDist * (middleLayer + 1),
                        y,
                        active: true,
                        connections: []
                    };
                    
                    // Add connections to next layer
                    nodes[middleLayer + 1].forEach(nextNode => {
                        newNode.connections.push({
                            target: nextNode,
                            weight: Math.random(),
                            signalPosition: 0,
                            signalActive: false,
                            signalSpeed: 0.01 + Math.random() * 0.02
                        });
                    });
                    
                    // Add connections from previous layer
                    nodes[middleLayer - 1].forEach(prevNode => {
                        prevNode.connections.push({
                            target: newNode,
                            weight: Math.random(),
                            signalPosition: 0,
                            signalActive: false,
                            signalSpeed: 0.01 + Math.random() * 0.02
                        });
                    });
                    
                    nodes[middleLayer].push(newNode);
                    
                    // Reposition nodes in the layer
                    repositionLayer(middleLayer);
                });
            }
            
            if (removeNodeBtn) {
                removeNodeBtn.addEventListener('click', function() {
                    // Remove node from middle layer
                    const middleLayer = Math.floor(layers.length / 2);
                    
                    if (nodes[middleLayer].length > 1) {
                        nodes[middleLayer].pop();
                        
                        // Reposition nodes in the layer
                        repositionLayer(middleLayer);
                    }
                });
            }
            
            if (trainNetworkBtn) {
                trainNetworkBtn.addEventListener('click', function() {
                    // Simulate training by randomizing weights and activating all nodes
                    nodes.forEach(layer => {
                        layer.forEach(node => {
                            node.active = true;
                            
                            node.connections.forEach(conn => {
                                conn.weight = Math.random();
                                conn.signalActive = true;
                            });
                        });
                    });
                });
            }
            
            function repositionLayer(layerIndex) {
                const nodeCount = nodes[layerIndex].length;
                const layerHeight = nodeCount * (nodeRadius * 2 + 10);
                const startY = (neuralNetCanvas.height - layerHeight) / 2;
                
                nodes[layerIndex].forEach((node, i) => {
                    node.y = startY + i * (nodeRadius * 2 + 10) + nodeRadius;
                });
            }
            
            // Handle window resize
            window.addEventListener('resize', function() {
                neuralNetCanvas.width = neuralNetCanvas.parentElement.clientWidth;
                neuralNetCanvas.height = neuralNetCanvas.parentElement.clientHeight;
                
                // Reposition all nodes
                nodes.forEach((layer, layerIndex) => {
                    const x = layerDist * (layerIndex + 1);
                    
                    layer.forEach((node, nodeIndex) => {
                        const layerHeight = layer.length * (nodeRadius * 2 + 10);
                        const startY = (neuralNetCanvas.height - layerHeight) / 2;
                        const y = startY + nodeIndex * (nodeRadius * 2 + 10) + nodeRadius;
                        
                        node.x = x;
                        node.y = y;
                    });
                });
            });
            
            // Start animation
            animateNeuralNet();
        }
    }
    
    // ===== GSAP ANIMATIONS =====
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        // Register ScrollTrigger plugin
        gsap.registerPlugin(ScrollTrigger);
        
        // Hero Section Animations
        const tl = gsap.timeline();
        
        tl.from('.hero-name', {
            y: 100,
            opacity: 0,
            duration: 1,
            ease: 'power4.out'
        })
        .from('.hero-profession', {
            y: 100,
            opacity: 0,
            duration: 1,
            ease: 'power4.out'
        }, '-=0.8')
        .from('.hero-description', {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power4.out'
        }, '-=0.8')
        .from('.hero-buttons', {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power4.out'
        }, '-=0.8')
        .from('.status-indicators', {
            y: 30,
            opacity: 0,
            duration: 1,
            ease: 'power4.out'
        }, '-=0.8')
        .from('.scroll-indicator', {
            y: 30,
            opacity: 0,
            duration: 1,
            ease: 'power4.out'
        }, '-=0.8');
        
        // Navbar Animation
        gsap.from('.navbar', {
            y: -100,
            opacity: 0,
            duration: 1,
            ease: 'power4.out'
        });
        
        // Neural Progress Animation
        gsap.to('.neural-progress', {
            width: '100%',
            duration: 3,
            ease: 'power2.inOut'
        });
        
        // About Section Animations
        gsap.from('.about-card-3d', {
            scrollTrigger: {
                trigger: '.about-section',
                start: 'top 70%',
                toggleActions: 'play none none none'
            },
            x: -100,
            opacity: 0,
            duration: 1.2,
            ease: 'power4.out'
        });
        
        gsap.from('.about-content', {
            scrollTrigger: {
                trigger: '.about-section',
                start: 'top 70%',
                toggleActions: 'play none none none'
            },
            x: 100,
            opacity: 0,
            duration: 1.2,
            ease: 'power4.out'
        });
        
        // Animate skill bars when they come into view
        const skillBars = document.querySelectorAll('.skill-per');
        skillBars.forEach(skillBar => {
            const percentage = skillBar.getAttribute('per');
            
            gsap.to(skillBar, {
                scrollTrigger: {
                    trigger: skillBar,
                    start: 'top 90%',
                    toggleActions: 'play none none none'
                },
                width: `${percentage}%`,
                duration: 1.5,
                ease: 'power2.out'
            });
        });
        
        // Projects Section Animations
        gsap.from('.filter-btn', {
            scrollTrigger: {
                trigger: '.projects-section',
                start: 'top 70%',
                toggleActions: 'play none none none'
            },
            y: 50,
            opacity: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: 'power2.out'
        });
        
        gsap.from('.project-card', {
            scrollTrigger: {
                trigger: '.projects-container',
                start: 'top 70%',
                toggleActions: 'play none none none'
            },
            y: 100,
            opacity: 0,
            stagger: 0.2,
            duration: 1,
            ease: 'power2.out'
        });
        
        // NFT Gallery Animation
        gsap.from('.nft-header', {
            scrollTrigger: {
                trigger: '.nft-showcase',
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power2.out'
        });
        
        gsap.from('.nft-item', {
            scrollTrigger: {
                trigger: '.nft-grid',
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            y: 50,
            opacity: 0,
            stagger: 0.2,
            duration: 1,
            ease: 'power2.out'
        });
        
        // Skills Section Animations
        gsap.from('.skills-matrix-container', {
            scrollTrigger: {
                trigger: '.skills-section',
                start: 'top 70%',
                toggleActions: 'play none none none'
            },
            y: 100,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
        
        gsap.from('.skill-group', {
            scrollTrigger: {
                trigger: '.skills-overlay',
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            y: 50,
            opacity: 0,
            stagger: 0.2,
            duration: 1,
            ease: 'power2.out'
        });
        
        gsap.from('.neural-network', {
            scrollTrigger: {
                trigger: '.neural-network',
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            y: 100,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
        
        gsap.from('.tools-showcase', {
            scrollTrigger: {
                trigger: '.tools-showcase',
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            y: 100,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
        
        gsap.from('.tool-item', {
            scrollTrigger: {
                trigger: '.tools-grid',
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            scale: 0.8,
            opacity: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: 'back.out(1.7)'
        });
        
        gsap.from('.live-coding', {
            scrollTrigger: {
                trigger: '.live-coding',
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            y: 100,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
        
        // Contact Section Animations
        gsap.from('.contact-info', {
            scrollTrigger: {
                trigger: '.contact-section',
                start: 'top 70%',
                toggleActions: 'play none none none'
            },
            x: -100,
            opacity: 0,
            duration: 1,
            ease: 'power2.out'
        });
        
        gsap.from('.contact-form', {
            scrollTrigger: {
                trigger: '.contact-section',
                start: 'top 70%',
                toggleActions: 'play none none none'
            },
            x: 100,
            opacity: 0,
            duration: 1,
            ease: 'power2.out'
        });
        
        // Footer Animations
        gsap.from('.footer-content', {
            scrollTrigger: {
                trigger: '.footer',
                start: 'top 90%',
                toggleActions: 'play none none none'
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power2.out'
        });
    }
    
    // ===== DYNAMIC TITLES ANIMATION =====
    const dynamicTitle = document.getElementById('dynamic-title');
    if (dynamicTitle) {
        const titles = [
            'FRONTEND',
            'DEVELOPER',
            'SOFTWARE',
            'ENGINEER',
            'Creative'
        ];
        
        let currentTitleIndex = 0;
        
        function changeTitle() {
            gsap.to(dynamicTitle, {
                opacity: 0,
                y: 10,
                duration: 0.5,
                onComplete: () => {
                    currentTitleIndex = (currentTitleIndex + 1) % titles.length;
                    dynamicTitle.textContent = titles[currentTitleIndex];
                    
                    gsap.to(dynamicTitle, {
                        opacity: 1,
                        y: 0,
                        duration: 0.5
                    });
                }
            });
        }
        
        // Change title every 3 seconds
        setInterval(changeTitle, 3000);
    }
    
    // ===== AI TAGLINE GENERATOR =====
    const aiTagline = document.getElementById('ai-tagline');
    if (aiTagline) {
        const taglines = [
            'immersive digital experiences at the intersection of art and technology',
            'next-generation web experiences that push the boundaries of reality',
            'cutting-edge interfaces where technology meets creativity',
            'innovative digital solutions for the metaverse generation',
            'transformative web experiences powered by AI and blockchain'
        ];
        
        // Simulate AI generating a new tagline
        function generateNewTagline() {
            // Randomly select a tagline
            const newTagline = taglines[Math.floor(Math.random() * taglines.length)];
            
            // Animate typing effect
            let i = 0;
            aiTagline.textContent = '';
            
            function typeChar() {
                if (i < newTagline.length) {
                    aiTagline.textContent += newTagline.charAt(i);
                    i++;
                    setTimeout(typeChar, 30 + Math.random() * 30);
                }
            }
            
            typeChar();
        }
        
        // Generate new tagline at random intervals (30-60 seconds)
        function scheduleNewTagline() {
            const delay = 30000 + Math.random() * 30000;
            setTimeout(() => {
                generateNewTagline();
                scheduleNewTagline();
            }, delay);
        }
        
        // Initial generation after 5 seconds
        setTimeout(() => {
            generateNewTagline();
            scheduleNewTagline();
        }, 5000);
    }
    
    // ===== NAVBAR SCROLL EFFECT =====
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Update neural progress bar on scroll
    const neuralProgress = document.querySelector('.neural-progress');
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const maxScroll = document.body.scrollHeight - window.innerHeight;
        const scrollPercentage = (scrolled / maxScroll) * 100;
        
        neuralProgress.style.width = `${scrollPercentage}%`;
    });
    
    // ===== HAMBURGER MENU TOGGLE =====
    const hamburger = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // ===== MAGNETIC BUTTONS =====
    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const position = btn.getBoundingClientRect();
            const x = e.clientX - position.left - position.width / 2;
            const y = e.clientY - position.top - position.height / 2;
            
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.5}px)`;
        });
        
        btn.addEventListener('mouseout', () => {
            btn.style.transform = 'translate(0px, 0px)';
        });
    });
    
    // ===== CUSTOM CURSOR =====
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    if (cursorDot && cursorOutline) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;
            
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;
            
            // Add a slight delay to the outline cursor for a trailing effect
            setTimeout(() => {
                cursorOutline.style.left = `${posX}px`;
                cursorOutline.style.top = `${posY}px`;
            }, 50);
        });
        
        // Cursor effects on hover
        const hoverElements = document.querySelectorAll('a, button, .project-card, .social-icon, .tool-item, .wallet-option, .ai-option');
        
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursorOutline.style.width = '60px';
                cursorOutline.style.height = '60px';
                cursorDot.style.transform = 'scale(1.5)';
            });
            
            element.addEventListener('mouseleave', () => {
                cursorOutline.style.width = '40px';
                cursorOutline.style.height = '40px';
                cursorDot.style.transform = 'scale(1)';
            });
        });
    }
    
    // ===== PROJECT FILTERING =====
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterBtns.length > 0 && projectCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');
                
                const filterValue = btn.getAttribute('data-filter');
                
                projectCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        gsap.to(card, {
                            duration: 0.5,
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            ease: 'power2.out',
                            clearProps: 'all'
                        });
                        card.style.display = 'block';
                    } else {
                        gsap.to(card, {
                            duration: 0.5,
                            opacity: 0,
                            y: 50,
                            scale: 0.9,
                            ease: 'power2.out',
                            onComplete: () => {
                                card.style.display = 'none';
                            }
                        });
                    }
                });
            });
        });
    }
    
    // ===== 3D TILT EFFECT FOR PROJECT CARDS =====
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const cardRect = card.getBoundingClientRect();
            const cardCenterX = cardRect.left + cardRect.width / 2;
            const cardCenterY = cardRect.top + cardRect.height / 2;
            const mouseX = e.clientX - cardCenterX;
            const mouseY = e.clientY - cardCenterY;
            
            const rotateX = (mouseY / (cardRect.height / 2)) * -10;
            const rotateY = (mouseX / (cardRect.width / 2)) * 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
    
    // ===== FORM SUBMISSION =====
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Add ripple effect to button
            const btn = contactForm.querySelector('.send-btn');
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.classList.add('ripple-effect');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            btn.appendChild(ripple);
            
            // Simulate form submission with loading state
            btn.disabled = true;
            btn.querySelector('span').textContent = 'Sending...';
            
            setTimeout(() => {
                ripple.remove();
                
                // Simulate success
                btn.disabled = false;
                btn.querySelector('span').textContent = 'Message Sent!';
                
                // Show a notification
                const notification = document.createElement('div');
                notification.className = 'notification success';
                notification.innerHTML = '<i class="fas fa-check-circle"></i> Message sent successfully!';
                document.body.appendChild(notification);
                
                setTimeout(() => {
                    notification.classList.add('show');
                }, 10);
                
                setTimeout(() => {
                    notification.classList.remove('show');
                    setTimeout(() => {
                        notification.remove();
                        btn.querySelector('span').textContent = 'Transmit Message';
                    }, 500);
                }, 3000);
                
                contactForm.reset();
            }, 2000);
        });
    }
    
    // ===== AI ASSISTANT =====
    const aiOptions = document.querySelectorAll('.ai-option');
    const messageInput = document.getElementById('message');
    
    if (aiOptions.length > 0 && messageInput) {
        aiOptions.forEach(option => {
            option.addEventListener('click', () => {
                const type = option.getAttribute('data-type');
                let message = '';
                
                // Simulate AI generating content based on type
                switch(type) {
                    case 'job':
                        message = 'I am interested in discussing potential job opportunities with your company. With expertise in frontend development, 3D visualization, and interactive web experiences, I believe I could bring significant value to your team. I would love to schedule a call to discuss how my skills align with your needs.';
                        break;
                    case 'collab':
                        message = 'I have an exciting project that could benefit from your creative vision and technical expertise. It involves creating an interactive 3D experience for our brand. Would you be interested in discussing a potential collaboration? I amm flexible with timelines and would value your input on the approach.';
                        break;
                    case 'project':
                        message = 'I am looking for a quote on developing an immersive web experience for my company. We need cutting-edge 3D visualizations and interactive elements that showcase our products. Could you provide an estimate based on a 3-month development timeline? Happy to provide more details during a call.';
                        break;
                }
                
                // Simulate typing effect
                let i = 0;
                messageInput.value = '';
                
                function typeChar() {
                    if (i < message.length) {
                        messageInput.value += message.charAt(i);
                        messageInput.dispatchEvent(new Event('input')); // Trigger input event for floating label
                        i++;
                        setTimeout(typeChar, 10);
                    }
                }
                
                typeChar();
            });
        });
    }
    
    // ===== VOICE COMMANDS =====
    const voiceControlBtn = document.getElementById('voice-control');
    const voiceModal = document.getElementById('voice-modal');
    
    if (voiceControlBtn && voiceModal) {
        voiceControlBtn.addEventListener('click', () => {
            voiceModal.classList.add('open');
            
            // Simulate voice recognition
            const voiceMessage = voiceModal.querySelector('.voice-message');
            
            setTimeout(() => {
                voiceMessage.textContent = 'Say a command...';
                
                setTimeout(() => {
                    // Simulate random voice command
                    const commands = [
                        'Go to projects',
                        'Show about section',
                        'Toggle theme',
                        'Connect wallet'
                    ];
                    
                    const randomCommand = commands[Math.floor(Math.random() * commands.length)];
                    voiceMessage.textContent = `Recognized: "${randomCommand}"`;
                    
                    // Play audio feedback
                    const voiceFeedback = document.getElementById('voice-feedback');
                    if (voiceFeedback) {
                        voiceFeedback.play();
                    }
                    
                    // Execute command after delay
                    setTimeout(() => {
                        voiceModal.classList.remove('open');
                        
                        // Simulate executing the command
                        if (randomCommand === 'Go to projects') {
                            document.querySelector('a[href="#projects"]').click();
                        } else if (randomCommand === 'Show about section') {
                            document.querySelector('a[href="#about"]').click();
                        } else if (randomCommand === 'Toggle theme') {
                            document.getElementById('theme-toggle').click();
                        } else if (randomCommand === 'Connect wallet') {
                            document.getElementById('connect-wallet').click();
                        }
                        
                        voiceMessage.textContent = 'Listening...';
                    }, 2000);
                }, 2000);
            }, 1000);
        });
        
        // Close modal button
        const modalClose = voiceModal.querySelector('.modal-close');
        if (modalClose) {
            modalClose.addEventListener('click', () => {
                voiceModal.classList.remove('open');
            });
        }
    }
    
    // ===== WALLET CONNECTION =====
    const connectWalletBtn = document.getElementById('connect-wallet');
    const walletModal = document.getElementById('wallet-modal');
    
    if (connectWalletBtn && walletModal) {
        connectWalletBtn.addEventListener('click', () => {
            walletModal.classList.add('open');
        });
        
        // Close modal button
        const modalClose = walletModal.querySelector('.modal-close');
        if (modalClose) {
            modalClose.addEventListener('click', () => {
                walletModal.classList.remove('open');
            });
        }
        
        // Wallet options
        const walletOptions = walletModal.querySelectorAll('.wallet-option');
        walletOptions.forEach(option => {
            option.addEventListener('click', () => {
                // Simulate connecting
                walletModal.classList.remove('open');
                
                // Simulate success notification
                const notification = document.createElement('div');
                notification.className = 'notification success';
                notification.innerHTML = '<i class="fas fa-check-circle"></i> Wallet connected successfully!';
                document.body.appendChild(notification);
                
                setTimeout(() => {
                    notification.classList.add('show');
                }, 10);
                
                setTimeout(() => {
                    notification.classList.remove('show');
                    setTimeout(() => {
                        notification.remove();
                    }, 500);
                }, 3000);
                
                // Update wallet button
                connectWalletBtn.innerHTML = '<i class="fas fa-wallet"></i>';
                connectWalletBtn.classList.add('connected');
            });
        });
    }
    
    // Connect wallet button in NFT section
    const nftWalletBtn = document.querySelector('.connect-wallet-btn');
    if (nftWalletBtn && walletModal) {
        nftWalletBtn.addEventListener('click', () => {
            walletModal.classList.add('open');
        });
    }
    
    // ===== NEURAL CONNECTION =====
    const neuralLinkBtn = document.querySelector('secondary-btn');
    const neuralModal = document.getElementById('neural-modal');
    
    if (neuralLinkBtn && neuralModal) {
        neuralLinkBtn.addEventListener('click', () => {
            neuralModal.classList.add('open');
            
            // Simulate connection progress
            setTimeout(() => {
                const connectionMessage = neuralModal.querySelector('.connection-message p');
                connectionMessage.textContent = 'Neural link established!';
                
                const indicator = neuralModal.querySelector('.connection-indicator');
                indicator.classList.remove('connecting');
                indicator.classList.add('connected');
                
                // Update status indicators in hero
                const statusLights = document.querySelectorAll('.status-light');
                statusLights.forEach(light => {
                    light.classList.add('pulse');
                });
                
                // Play audio feedback
                const voiceFeedback = document.getElementById('voice-feedback');
                if (voiceFeedback) {
                    voiceFeedback.play();
                }
                
                // Close modal after delay
                setTimeout(() => {
                    neuralModal.classList.remove('open');
                }, 2000);
            }, 3000);
        });
        
        // Close modal button
        const modalClose = neuralModal.querySelector('.modal-close');
        if (modalClose) {
            modalClose.addEventListener('click', () => {
                neuralModal.classList.remove('open');
            });
        }
    }
    
    // ===== THEME TOGGLE =====
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            htmlElement.classList.toggle('light-theme');
            
            if (htmlElement.classList.contains('light-theme')) {
                themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
                
                // Update CSS variables for light theme
                document.documentElement.style.setProperty('--dark-bg', '#f5f5f5');
                document.documentElement.style.setProperty('--darker-bg', '#e0e0e0');
                document.documentElement.style.setProperty('--light-bg', '#ffffff');
                document.documentElement.style.setProperty('--text-color', '#333333');
                document.documentElement.style.setProperty('--light-text', '#333333');
                document.documentElement.style.setProperty('--card-dark-bg', '#ffffff');
            } else {
                themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
                
                // Reset to default dark theme
                document.documentElement.style.setProperty('--dark-bg', '#121212');
                document.documentElement.style.setProperty('--darker-bg', '#0a0a0a');
                document.documentElement.style.setProperty('--light-bg', '#f9f9f9');
                document.documentElement.style.setProperty('--text-color', '#333333');
                document.documentElement.style.setProperty('--light-text', '#f5f5f5');
                document.documentElement.style.setProperty('--card-dark-bg', '#1e1e1e');
            }
        });
    }
    
    // ===== BACK TO TOP BUTTON =====
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ===== SMOOTH SCROLLING =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for navbar height
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== NOTIFICATION SYSTEM =====
    // Add CSS for notifications
    const notificationStyles = document.createElement('style');
    notificationStyles.textContent = `
        .notification {
            position: fixed;
            bottom: 30px;
            left: 30px;
            padding: 15px 20px;
            background: rgba(18, 18, 18, 0.9);
            color: #fff;
            border-radius: 10px;
            display: flex;
            align-items: center;
            gap: 10px;
            transform: translateY(100px);
            opacity: 0;
            transition: all 0.3s ease;
            z-index: 9999;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .notification.show {
            transform: translateY(0);
            opacity: 1;
        }
        
        .notification.success {
            border-left: 4px solid #6c63ff;
        }
        
        .notification.error {
            border-left: 4px solid #ff6b6b;
        }
        
        .notification i {
            font-size: 20px;
        }
        
        .notification.success i {
            color: #6c63ff;
        }
        
        .notification.error i {
            color: #ff6b6b;
        }
        
        .ripple-effect {
            position: absolute;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(notificationStyles);
    
    // ===== BUTTON RIPPLE EFFECT =====
    const buttons = document.querySelectorAll('button');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const x = e.clientX - e.target.offsetLeft;
            const y = e.clientY - e.target.offsetTop;
            
            const ripple = document.createElement('span');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            ripple.classList.add('ripple-effect');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // ===== ACTIVE SECTION HIGHLIGHTING =====
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-nav') === current) {
                link.classList.add('active');
            }
        });
    });
    
    // ===== MODAL FUNCTIONALITY =====
    const modals = document.querySelectorAll('.modal');
    const modalCloseButtons = document.querySelectorAll('.modal-close');
    
    modalCloseButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            modal.classList.remove('open');
        });
    });
    
    // Close modal when clicking outside
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('open');
            }
        });
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                modal.classList.remove('open');
            });
        }
    });
    
    // ===== FLOATING LABELS FOR FORM INPUTS =====
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('input', () => {
            if (input.value.trim() !== '') {
                input.classList.add('has-value');
            } else {
                input.classList.remove('has-value');
            }
        });
    });
    
    // ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
    const animatedElements = document.querySelectorAll('.skill-tag, .tool-item, .social-icon, .project-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // Add CSS for intersection observer animations
    const observerStyles = document.createElement('style');
    observerStyles.textContent = `
        .skill-tag, .tool-item, .social-icon, .project-card {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .skill-tag.animate, .tool-item.animate, .social-icon.animate, .project-card.animate {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(observerStyles);
    
    // ===== TYPING ANIMATION FOR TERMINAL =====
    function createTypingAnimation() {
        const typingElements = document.querySelectorAll('.typing');
        
        typingElements.forEach(element => {
            const text = element.textContent;
            element.textContent = '';
            
            let i = 0;
            const speed = 50; // typing speed in milliseconds
            
            function typeWriter() {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, speed + Math.random() * 50);
                }
            }
            
            typeWriter();
        });
    }
    
    // Start typing animation after page load
    setTimeout(createTypingAnimation, 3000);
    
    // ===== BLOCKCHAIN INTEGRATION SIMULATION =====
    const connectWalletBtns = document.querySelectorAll('.connect-wallet-btn, #connect-wallet');
    
    connectWalletBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Simulate blockchain connection
            console.log('Simulating blockchain connection...');
            
            // Update blockchain status indicator
            const blockchainStatus = document.querySelectorAll('.status-indicator')[1];
            if (blockchainStatus) {
                blockchainStatus.querySelector('.status-light').classList.add('pulse');
                blockchainStatus.querySelector('.status-text').textContent = 'Blockchain Connected';
            }
        });
    });
    
    // ===== AI INTEGRATION SIMULATION =====
    // Simulate AI-powered features
    function simulateAI() {
        console.log('Simulating AI integration...');
        
        // AI-generated tagline
        const aiTagline = document.getElementById('ai-tagline');
        if (aiTagline) {
            const taglines = [
                'immersive digital experiences at the intersection of art and technology',
                'next-generation web experiences that push the boundaries of reality',
                'cutting-edge interfaces where technology meets creativity',
                'innovative digital solutions for the metaverse generation',
                'transformative web experiences powered by AI and blockchain'
            ];
            
            setInterval(() => {
                const randomTagline = taglines[Math.floor(Math.random() * taglines.length)];
                
                // Simulate typing effect
                let i = 0;
                aiTagline.textContent = '';
                
                function typeChar() {
                    if (i < randomTagline.length) {
                        aiTagline.textContent += randomTagline.charAt(i);
                        i++;
                        setTimeout(typeChar, 30);
                    }
                }
                
                typeChar();
            }, 10000);
        }
    }
    
    // Start AI simulation after page load
    setTimeout(simulateAI, 5000);
    
    // ===== VOICE INTERACTION SIMULATION =====
    const voiceBtn = document.getElementById('voice-control');
    
    if (voiceBtn) {
        voiceBtn.addEventListener('click', () => {
            console.log('Simulating voice interaction...');
            
            // Show voice modal
            const voiceModal = document.getElementById('voice-modal');
            if (voiceModal) {
                voiceModal.classList.add('open');
                
                // Simulate voice recognition
                setTimeout(() => {
                    const voiceMessage = voiceModal.querySelector('.voice-message');
                    if (voiceMessage) {
                        voiceMessage.textContent = 'Processing command...';
                        
                        setTimeout(() => {
                            voiceMessage.textContent = 'Command recognized!';
                            
                            // Close modal after delay
                            setTimeout(() => {
                                voiceModal.classList.remove('open');
                                
                                // Simulate executing a random command
                                const commands = [
                                    () => document.querySelector('a[href="#projects"]').click(),
                                    () => document.querySelector('a[href="#about"]').click(),
                                    () => document.querySelector('a[href="#skills"]').click(),
                                    () => document.querySelector('a[href="#contact"]').click()
                                ];
                                
                                const randomCommand = commands[Math.floor(Math.random() * commands.length)];
                                randomCommand();
                            }, 1000);
                        }, 1500);
                    }
                }, 1000);
            }
        });
    }
    
    // ===== METAVERSE INTEGRATION SIMULATION =====
    const metaverseBtn = document.querySelector('primary-btn');
    
    if (metaverseBtn) {
        metaverseBtn.addEventListener('click', () => {
            console.log('Simulating metaverse integration...');
            
            // Create fullscreen overlay for metaverse experience
            const metaverseOverlay = document.createElement('div');
            metaverseOverlay.className = 'metaverse-overlay';
            metaverseOverlay.innerHTML = `
                <div class="metaverse-content">
                    <h2>Entering Metaverse</h2>
                    <div class="loading-bar">
                        <div class="loading-progress"></div>
                    </div>
                    <p>Initializing neural interface...</p>
                </div>
                <button class="close-metaverse">Exit Metaverse</button>
            `;
            document.body.appendChild(metaverseOverlay);
            
            // Add CSS for metaverse overlay
            const metaverseStyles = document.createElement('style');
            metaverseStyles.textContent = `
                .metaverse-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(10, 10, 10, 0.95);
                    z-index: 9999;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;
                    backdrop-filter: blur(10px);
                }
                
                .metaverse-content {
                    text-align: center;
                    color: #fff;
                }
                
                .metaverse-content h2 {
                    font-size: 3rem;
                    margin-bottom: 2rem;
                    color: #6c63ff;
                }
                
                .loading-bar {
                    width: 300px;
                    height: 10px;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 5px;
                    margin: 0 auto 2rem;
                    overflow: hidden;
                }
                
                .loading-progress {
                    height: 100%;
                    width: 0;
                    background: linear-gradient(90deg, #6c63ff, #00d9ff);
                    animation: loading 3s forwards;
                }
                
                @keyframes loading {
                    0% { width: 0; }
                    100% { width: 100%; }
                }
                
                .close-metaverse {
                    position: absolute;
                    bottom: 30px;
                    padding: 1rem 2rem;
                    background: #6c63ff;
                    color: #fff;
                    border: none;
                    border-radius: 50px;
                    cursor: pointer;
                    font-size: 1.6rem;
                    opacity: 0;
                    transition: opacity 0.5s ease;
                }
                
                .close-metaverse.visible {
                    opacity: 1;
                }
            `;
            document.head.appendChild(metaverseStyles);
            
            // Simulate loading
            setTimeout(() => {
                const closeBtn = document.querySelector('.close-metaverse');
                closeBtn.classList.add('visible');
                
                const metaverseContent = document.querySelector('.metaverse-content');
                metaverseContent.innerHTML = `
                    <h2>Welcome to the Metaverse</h2>
                    <p>This is a simulated metaverse experience. In a real implementation, this would be a WebXR or Three.js immersive environment.</p>
                `;
                
                // Add exit functionality
                closeBtn.addEventListener('click', () => {
                    metaverseOverlay.remove();
                });
            }, 3000);
        });
    }
    
    // ===== BRAINWAVE DETECTION SIMULATION =====
    function simulateBrainwaveDetection() {
        console.log('Simulating brainwave detection...');
        
        // Create brainwave indicator
        const brainwaveIndicator = document.createElement('div');
        brainwaveIndicator.className = 'brainwave-indicator';
        brainwaveIndicator.innerHTML = `
            <div class="brainwave-icon">
                <i class="fas fa-brain"></i>
            </div>
            <div class="brainwave-waves">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        `;
        document.body.appendChild(brainwaveIndicator);
        
        // Add CSS for brainwave indicator
        const brainwaveStyles = document.createElement('style');
        brainwaveStyles.textContent = `
            .brainwave-indicator {
                position: fixed;
                top: 20px;
                right: 20px;
                display: flex;
                align-items: center;
                gap: 10px;
                background: rgba(10, 10, 10, 0.7);
                padding: 10px;
                border-radius: 50px;
                backdrop-filter: blur(5px);
                z-index: 999;
                border: 1px solid rgba(108, 99, 255, 0.3);
            }
            
            .brainwave-icon {
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #6c63ff;
                font-size: 16px;
            }
            
            .brainwave-waves {
                display: flex;
                align-items: center;
                height: 20px;
            }
            
            .brainwave-waves span {
                display: block;
                width: 2px;
                height: 5px;
                margin: 0 2px;
                background: #6c63ff;
                animation: brainwave 1s infinite;
                border-radius: 2px;
            }
            
            .brainwave-waves span:nth-child(2) {
                animation-delay: 0.1s;
            }
            
            .brainwave-waves span:nth-child(3) {
                animation-delay: 0.2s;
            }
            
            .brainwave-waves span:nth-child(4) {
                animation-delay: 0.3s;
            }
            
            @keyframes brainwave {
                0%, 100% { height: 5px; }
                50% { height: 15px; }
            }
        `;
        document.head.appendChild(brainwaveStyles);
        
        // Simulate brainwave detection for scrolling
        window.addEventListener('scroll', () => {
            const brainwaveWaves = document.querySelectorAll('.brainwave-waves span');
            
            brainwaveWaves.forEach(wave => {
                wave.style.animationDuration = '0.5s';
            });
            
            setTimeout(() => {
                brainwaveWaves.forEach(wave => {
                    wave.style.animationDuration = '1s';
                });
            }, 1000);
        });
    }
    
    // Start brainwave detection simulation after page load
    setTimeout(simulateBrainwaveDetection, 8000);
    
    // ===== AR BUSINESS CARD SIMULATION =====
    const arMarker = document.querySelector('.ar-marker');
    
    if (arMarker) {
        arMarker.addEventListener('click', () => {
            console.log('Simulating AR business card...');
            
            // Create AR overlay
            const arOverlay = document.createElement('div');
            arOverlay.className = 'ar-overlay';
            arOverlay.innerHTML = `
                <div class="ar-content">
                    <div class="ar-card">
                        <div class="ar-card-header">
                            <img src="img/fitse.jpg" alt="Profile" class="ar-profile">
                            <h3>FITSUM G.</h3>
                            <p> Software Architect</p>
                        </div>
                        <div class="ar-card-body">
                            <div class="ar-contact-item">
                                <i class="fas fa-envelope"></i>
                                <span>fitsumgashaw11@gmail.com</span>
                            </div>
                            <div class="ar-contact-item">
                                <i class="fas fa-phone"></i>
                                <span>+251 944 656 593 </span>
                            </div>
                            <div class="ar-contact-item">
                                <i class="fas fa-map-marker-alt"></i>
                                <span> Kombolcha , Ethiopia </span>
                            </div>
                        </div>
                        <div class="ar-card-footer">
                            <a href="#" class="ar-social-icon"><i class="fab fa-github"></i></a>
                            <a href="#" class="ar-social-icon"><i class="fab fa-linkedin-in"></i></a>
                            <a href="#" class="ar-social-icon"><i class="fab fa-twitter"></i></a>
                        </div>
                    </div>
                </div>
                <button class="close-ar">Close AR View</button>
            `;
            document.body.appendChild(arOverlay);
            
            // Add CSS for AR overlay
            const arStyles = document.createElement('style');
            arStyles.textContent = `
                .ar-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.7);
                    z-index: 9999;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    backdrop-filter: blur(10px);
                }
                
                .ar-content {
                    perspective: 1000px;
                }
                
                .ar-card {
                    width: 350px;
                    background: rgba(30, 30, 30, 0.9);
                    border-radius: 15px;
                    overflow: hidden;
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
                    transform-style: preserve-3d;
                    animation: ar-card-float 3s infinite alternate;
                    border: 1px solid rgba(108, 99, 255, 0.5);
                }
                
                @keyframes ar-card-float {
                    0% {
                        transform: rotateX(5deg) rotateY(5deg) translateZ(0);
                    }
                    100% {
                        transform: rotateX(-5deg) rotateY(-5deg) translateZ(20px);
                    }
                }
                
                .ar-card-header {
                    padding: 20px;
                    text-align: center;
                    background: linear-gradient(135deg, #6c63ff, #4a45b1);
                    color: #fff;
                }
                
                .ar-profile {
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                    margin: 0 auto 15px;
                    border: 3px solid #fff;
                    object-fit: cover;
                }
                
                .ar-card-header h3 {
                    font-size: 24px;
                    margin-bottom: 5px;
                }
                
                .ar-card-header p {
                    opacity: 0.8;
                    font-size: 16px;
                }
                
                .ar-card-body {
                    padding: 20px;
                }
                
                .ar-contact-item {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    margin-bottom: 15px;
                    color: #fff;
                }
                
                .ar-contact-item i {
                    width: 30px;
                    height: 30px;
                    background: rgba(108, 99, 255, 0.2);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #6c63ff;
                }
                
                .ar-card-footer {
                    padding: 20px;
                    display: flex;
                    justify-content: center;
                    gap: 20px;
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                }
                
                .ar-social-icon {
                    width: 40px;
                    height: 40px;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #fff;
                    font-size: 18px;
                    transition: all 0.3s ease;
                }
                
                .ar-social-icon:hover {
                    background: #6c63ff;
                    transform: translateY(-5px);
                }
                
                .close-ar {
                    position: absolute;
                    bottom: 30px;
                    padding: 10px 20px;
                    background: #6c63ff;
                    color: #fff;
                    border: none;
                    border-radius: 50px;
                    cursor: pointer;
                    font-size: 16px;
                }
            `;
            document.head.appendChild(arStyles);
            
            // Add mouse movement effect to AR card
            const arCard = document.querySelector('.ar-card');
            document.addEventListener('mousemove', (e) => {
                if (arCard) {
                    const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
                    const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
                    arCard.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
                }
            });
            
            // Add close functionality
            const closeArBtn = document.querySelector('.close-ar');
            closeArBtn.addEventListener('click', () => {
                arOverlay.remove();
            });
        });
    }
});