import { Soldier } from '../models/Soldier';

export const appendixGenerators = {
  // 1. Đảng viên
  generatePartyMembersList: (soldiers: Soldier[]) => {
    return soldiers.filter(s => s.isPartyMember).map(s => ({
      fullName: s.fullName,
      dateOfBirth: s.dateOfBirth,
      position: s.position,
      unit: s.unit,
      hometown: s.hometown,
      currentAddress: s.currentAddress,
      partyJoinDate: s.partyJoinDate,
      notes: s.notes,
    }));
  },

  // 2. Bố mẹ là Đảng viên
  generatePartyMemberChildrenList: (soldiers: Soldier[]) => {
    return soldiers.filter(s => 
      s.parentsPartyMember?.father || s.parentsPartyMember?.mother
    ).map(s => ({
      fullName: s.fullName,
      dateOfBirth: s.dateOfBirth,
      position: s.position,
      unit: s.unit,
      hometown: s.hometown,
      currentAddress: s.currentAddress,
      fatherName: s.fatherName,
      motherName: s.motherName,
      notes: s.notes,
    }));
  },

  // Add generators for other appendices...
}; 