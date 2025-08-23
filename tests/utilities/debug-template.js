#!/usr/bin/env node

// Debug the template generation process
const fs = require('fs');
const { execSync } = require('child_process');

async function debugTemplate() {
  try {
    console.log('=== Debugging Template Generation ===\n');
    
    // Let's create a simple test to see what the service is actually producing
    console.log('1. Testing the service directly...');
    
    // First, let's see what keys are actually being built in the template
    console.log('   Checking the buildTemplateStructure method...');
    
    // Read the service file to see the template keys
    const serviceFile = fs.readFileSync('../../app/src/modules/releases/services/order-release-transformer.service.ts', 'utf8');
    
    // Extract the template structure keys from lines 125-210
    const templateLines = serviceFile.split('\n').slice(124, 210);
    console.log('   Template keys being built:');
    
    templateLines.forEach((line, i) => {
      if (line.includes(':') && !line.trim().startsWith('//') && !line.trim().startsWith('*')) {
        const key = line.split(':')[0].trim();
        if (key && !key.includes('(') && !key.includes('const')) {
          console.log(`     ${key}`);
        }
      }
    });
    
    console.log('\n2. Expected vs Current key comparison:');
    
    // Check the expected output keys
    const expectedOutput = JSON.parse(fs.readFileSync('./app/release/MAO-123456789-C7L2LCDCTCC2AE.json', 'utf8'));
    const expectedKeys = Object.keys(expectedOutput);
    
    console.log(`   Expected first 10 keys: ${expectedKeys.slice(0, 10).join(', ')}`);
    
    // Check if there's a current output
    if (fs.existsSync('./app/release/rel-123456789-C7L2LCDCTCC2AE.json')) {
      const currentOutput = JSON.parse(fs.readFileSync('./app/release/rel-123456789-C7L2LCDCTCC2AE.json', 'utf8'));
      const currentKeys = Object.keys(currentOutput);
      
      console.log(`   Current first 10 keys:  ${currentKeys.slice(0, 10).join(', ')}`);
      
      console.log('\n3. Key casing analysis:');
      expectedKeys.slice(0, 5).forEach((expectedKey, i) => {
        const currentKey = currentKeys[i] || '(missing)';
        console.log(`   ${expectedKey} vs ${currentKey} - ${expectedKey === currentKey ? 'MATCH' : 'DIFFERENT'}`);
      });
    }
    
    console.log('\n=== Debug Complete ===');
    
  } catch (error) {
    console.error('Debug failed:', error.message);
  }
}

debugTemplate();
