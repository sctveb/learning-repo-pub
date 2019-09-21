for(var i = 1; i <= 6; i += 1) {    
    console.log('*'.repeat(i));
}

for(var i = 1; i <= 64; i *= 2) {    
    console.log('*'.repeat(i));
}

for(var i = 1; i <= 64; i *= 2) {    
    console.log('*'.repeat(i));
}

for(var i = 5; i >= 1; i -= 1) {    
    console.log(' '.repeat(5-i) + '*'.repeat(i));
}

for(var i = 9; i >= 1; i -= 2) {    
    console.log(' '.repeat((9-i)/2) + '*'.repeat(i) + ' '.repeat((9-i)/2));
}