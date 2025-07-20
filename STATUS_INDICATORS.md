# Status Indicators Documentation

The BGP provider cards display three important status indicators with colored icons:

## 1. 🛡️ RPKI Status (Shield Icon)
- **Green Shield**: RPKI validation is supported and active
- **Red Shield**: RPKI validation is not supported or inactive
- **Meaning**: RPKI (Resource Public Key Infrastructure) helps prevent BGP hijacking by validating route origins

## 2. ⏰ Prefix Update Status (Clock Icon) 
- **Green Clock**: Automatic IRR (Internet Routing Registry) updates
- **Red Clock**: Manual updates required or no automatic IRR updates
- **Meaning**: Shows whether the provider automatically updates route filters from IRR databases

## 3. 📖 LOA Required Status (Book Icon)
- **Green Book**: No Letter of Authorization required for BGP setup
- **Red Book**: Letter of Authorization (LOA) required from your upstream/RIR
- **Meaning**: Indicates whether you need to provide documentation proving you're authorized to announce your IP space

## Understanding the Colors:
- **Green**: Good/Easy for customers (automatic, no extra requirements)
- **Red**: Additional work/requirements for customers (manual process, extra documentation needed)

## Example Provider Status Combinations:

### Provider A: All Green ✅✅✅
- RPKI enabled, automatic IRR updates, no LOA required
- **Best case scenario** - fully automated BGP setup

### Provider B: Mixed 🔴✅🔴  
- No RPKI, automatic IRR, LOA required
- **Moderate setup** - some manual work required

### Provider C: All Red 🔴🔴🔴
- No RPKI, manual updates, LOA required  
- **Complex setup** - requires manual configuration and documentation

## Data Source Mapping:
In the source data, these statuses are determined from the `bgpFilters` array:
- RPKI Status: `"RPKI"` in bgpFilters → Green, otherwise Red
- Prefix Updates: `"Automatic IRR"` in bgpFilters → Green, otherwise Red  
- LOA Required: `"LOA Required"` in bgpFilters → Red, otherwise Green
