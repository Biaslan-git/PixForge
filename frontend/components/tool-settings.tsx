'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ToolSettingsProps {
  selectedTool: string;
}

const ToolSettings = ({ selectedTool }: ToolSettingsProps) => {
  // Convert tool ID to proper display name
  const getToolDisplayName = (toolId: string) => {
    switch(toolId) {
      case 'convert': return 'Конвертация';
      case 'compress': return 'Сжатие';
      case 'crop': return 'Обрезка';
      case 'watermark': return 'Водяной знак';
      default: return toolId;
    }
  };

  // Render different settings based on selected tool
  const renderToolSettings = () => {
    switch(selectedTool) {
      case 'convert':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Формат изображения</label>
              <select 
                name="format"
                className="w-full p-2 border rounded-md bg-background"
              >
                <option value="jpg">JPG</option>
                <option value="png">PNG</option>
                <option value="webp">WebP</option>
                <option value="gif">GIF</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Качество (для JPG и WebP)</label>
              <div className="flex items-center space-x-2">
                <input 
                  type="range" 
                  name="quality"
                  min="1"
                  max="100"
                  defaultValue="80"
                  className="w-full"
                />
                <span className="text-sm w-10">80%</span>
              </div>
            </div>
          </div>
        );
      
      case 'compress':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Уровень сжатия</label>
              <div className="flex items-center space-x-2">
                <input 
                  type="range" 
                  name="compression"
                  min="1"
                  max="100"
                  defaultValue="60"
                  className="w-full"
                />
                <span className="text-sm w-10">60%</span>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Целевой размер файла (KB)</label>
              <input 
                type="number" 
                name="targetSize" 
                placeholder="Введите размер" 
                min="1"
                className="w-full p-2 border rounded-md bg-background"
              />
            </div>
          </div>
        );
      
      case 'crop':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Ширина (px)</label>
                <input 
                  type="number" 
                  name="width" 
                  placeholder="Ширина" 
                  min="1"
                  className="w-full p-2 border rounded-md bg-background"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Высота (px)</label>
                <input 
                  type="number" 
                  name="height" 
                  placeholder="Высота" 
                  min="1"
                  className="w-full p-2 border rounded-md bg-background"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">X (отступ слева)</label>
                <input 
                  type="number" 
                  name="x" 
                  placeholder="X координата" 
                  min="0"
                  className="w-full p-2 border rounded-md bg-background"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Y (отступ сверху)</label>
                <input 
                  type="number" 
                  name="y" 
                  placeholder="Y координата" 
                  min="0"
                  className="w-full p-2 border rounded-md bg-background"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Сохранить пропорции</label>
              <div className="flex items-center mt-2">
                <input 
                  type="checkbox" 
                  name="keepAspectRatio" 
                  className="mr-2 h-4 w-4"
                />
                <span>Включить</span>
              </div>
            </div>
          </div>
        );
      
      case 'watermark':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Загрузить изображение водяного знака</label>
              <input 
                type="file" 
                name="watermarkImage" 
                accept="image/*"
                className="w-full p-2 border rounded-md bg-background"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Позиция по X (%)</label>
                <div className="flex items-center space-x-2">
                  <input 
                    type="range" 
                    name="positionX"
                    min="0"
                    max="100"
                    defaultValue="10"
                    className="w-full"
                  />
                  <span className="text-sm w-10">10%</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Позиция по Y (%)</label>
                <div className="flex items-center space-x-2">
                  <input 
                    type="range" 
                    name="positionY"
                    min="0"
                    max="100"
                    defaultValue="90"
                    className="w-full"
                  />
                  <span className="text-sm w-10">90%</span>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Прозрачность (%)</label>
              <div className="flex items-center space-x-2">
                <input 
                  type="range" 
                  name="opacity"
                  min="0"
                  max="100"
                  defaultValue="50"
                  className="w-full"
                />
                <span className="text-sm w-10">50%</span>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Размер водяного знака (%)</label>
              <div className="flex items-center space-x-2">
                <input 
                  type="range" 
                  name="size"
                  min="10"
                  max="100"
                  defaultValue="20"
                  className="w-full"
                />
                <span className="text-sm w-10">20%</span>
              </div>
            </div>
          </div>
        );
      
      default:
        return <p>Настройки для выбранного инструмента недоступны</p>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{getToolDisplayName(selectedTool)}</CardTitle>
      </CardHeader>
      <CardContent>
        {renderToolSettings()}
      </CardContent>
    </Card>
  );
};

export default ToolSettings;