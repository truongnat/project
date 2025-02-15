import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { supabase } from '../lib/supabase';

interface PersonnelFormData {
  full_name: string;
  birth_date: string;
  position: string;
  unit: string;
  hometown: string;
  residence: string;
  notes: string;
  // Party member info
  is_party_member: boolean;
  party_join_date?: string;
  party_notes?: string;
  // Ethnic minority info
  is_ethnic_minority: boolean;
  ethnicity?: string;
  ethnic_notes?: string;
  // Religious info
  has_religion: boolean;
  religion?: string;
  religion_notes?: string;
  // Education info
  education_level?: string;
  education_type?: string;
  school_name?: string;
  major?: string;
  // Marriage info
  is_married: boolean;
  spouse_name?: string;
  marriage_date?: string;
  marriage_notes?: string;
  // Soldier info
  soldier_name: string;
  soldier_dob: string;
  soldier_position: string;
  soldier_unit: string;
  soldier_hometown: string;
  soldier_residence: string;
  soldier_notes: string;
  // Appendix 1-20 info
  appendix1?: string;
  appendix2?: string;
  appendix3?: string;
  appendix4?: string;
  appendix5?: string;
  appendix6?: string;
  appendix7?: string;
  appendix8?: string;
  appendix9?: string;
  appendix10?: string;
  appendix11?: string;
  appendix12?: string;
  appendix13?: string;
  appendix14?: string;
  appendix15?: string;
  appendix16?: string;
  appendix17?: string;
  appendix18?: string;
  appendix19?: string;
  appendix20?: string;
}

export const PersonnelForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<PersonnelFormData>();

  const onSubmit = async (data: PersonnelFormData) => {
    try {
      // Insert personnel data
      const { data: personnelData, error: personnelError } = await supabase
        .from('personnel')
        .insert([{
          full_name: data.full_name,
          birth_date: data.birth_date,
          position: data.position,
          unit: data.unit,
          hometown: data.hometown,
          residence: data.residence,
          notes: data.notes,
        }])
        .select()
        .single();

      if (personnelError) throw personnelError;

      const personnel_id = personnelData.id;

      // Insert party member info if applicable
      if (data.is_party_member) {
        await supabase
          .from('party_members')
          .insert([{
            personnel_id,
            join_date: data.party_join_date,
            notes: data.party_notes,
          }]);
      }

      // Insert ethnic minority info if applicable
      if (data.is_ethnic_minority) {
        await supabase
          .from('ethnic_minorities')
          .insert([{
            personnel_id,
            ethnicity: data.ethnicity,
            notes: data.ethnic_notes,
          }]);
      }

      // Insert religious info if applicable
      if (data.has_religion) {
        await supabase
          .from('religious_affiliations')
          .insert([{
            personnel_id,
            religion: data.religion,
            notes: data.religion_notes,
          }]);
      }

      // Insert education info
      if (data.education_level) {
        await supabase
          .from('education')
          .insert([{
            personnel_id,
            education_level: data.education_level,
            education_type: data.education_type,
            school_name: data.school_name,
            major: data.major,
          }]);
      }

      // Insert marriage info if applicable
      if (data.is_married) {
        await supabase
          .from('marriage_info')
          .insert([{
            personnel_id,
            spouse_name: data.spouse_name,
            marriage_date: data.marriage_date,
            notes: data.marriage_notes,
          }]);
      }

      // Insert soldier info
      await supabase
        .from('soldier_info')
        .insert([{
          personnel_id,
          name: data.soldier_name,
          dob: data.soldier_dob,
          position: data.soldier_position,
          unit: data.soldier_unit,
          hometown: data.soldier_hometown,
          residence: data.soldier_residence,
          notes: data.soldier_notes,
        }]);

      // Insert appendix 1-20 info
      for (let i = 1; i <= 20; i++) {
        if (data[`appendix${i}`]) {
          await supabase
            .from(`appendix${i}`)
            .insert([{
              personnel_id,
              info: data[`appendix${i}`],
            }]);
        }
      }

      alert('Thông tin đã được lưu thành công!');
    } catch (error) {
      console.error('Error:', error);
      alert('Có lỗi xảy ra khi lưu thông tin!');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Thông tin cán bộ</h2>
        
        {/* Thông tin cơ bản */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700">Họ và tên</label>
            <input
              type="text"
              {...register('full_name', { required: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Ngày sinh</label>
            <input
              type="date"
              {...register('birth_date', { required: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Chức vụ</label>
            <input
              type="text"
              {...register('position')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Đơn vị</label>
            <input
              type="text"
              {...register('unit')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Quê quán</label>
            <input
              type="text"
              {...register('hometown')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Trú quán</label>
            <input
              type="text"
              {...register('residence')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Ghi chú</label>
            <textarea
              {...register('notes')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Thông tin Đảng viên */}
        <div className="border-t pt-6 mb-8">
          <h3 className="text-lg font-medium mb-4">Thông tin Đảng viên</h3>
          <div className="space-y-4">
            <div>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  {...register('is_party_member')}
                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                <span className="ml-2">Là Đảng viên</span>
              </label>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Ngày vào Đảng</label>
                <input
                  type="date"
                  {...register('party_join_date')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Ghi chú</label>
                <input
                  type="text"
                  {...register('party_notes')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Thông tin quân nhân */}
        <div className="border-t pt-6 mb-8">
          <h3 className="text-lg font-medium mb-4">Thông tin quân nhân</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Họ và tên</label>
              <input
                type="text"
                {...register('soldier_name')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Ngày sinh</label>
              <input
                type="date"
                {...register('soldier_dob')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Chức vụ</label>
              <input
                type="text"
                {...register('soldier_position')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Đơn vị</label>
              <input
                type="text"
                {...register('soldier_unit')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Quê quán</label>
              <input
                type="text"
                {...register('soldier_hometown')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Trú quán</label>
              <input
                type="text"
                {...register('soldier_residence')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Ghi chú</label>
              <textarea
                {...register('soldier_notes')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Phụ lục 1-20 */}
        <div className="border-t pt-6 mb-8">
          <h3 className="text-lg font-medium mb-4">Phụ lục 1-20</h3>
          <div className="space-y-4">
            {Array.from({ length: 20 }, (_, i) => (
              <div key={i}>
                <label className="block text-sm font-medium text-gray-700">{`Phụ lục ${i + 1}`}</label>
                <input
                  type="text"
                  {...register(`appendix${i + 1}`)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Lưu thông tin
          </button>
        </div>
      </div>
    </form>
  );
};