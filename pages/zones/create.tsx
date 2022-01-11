import Link from "next/link";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { FunctionComponent, useEffect, useState } from "react";
import { InputNumber } from 'primereact/inputnumber';
import { Zone } from "../../models/Zone.type";
import { ColorPicker } from 'primereact/colorpicker';

interface CreateZoneComponentProps {

}

const CreateZoneComponent: FunctionComponent<CreateZoneComponentProps> = () => {

  const [zone, setZone] = useState<Zone>();

  useEffect(() => {
    console.log(zone)
  }, [zone])

  return (
    <form>
      <div className="p-grid">
        <div className="p-col">
          <label htmlFor="zoneName" className="p-d-block">Nome do Ambiente</label>
          <InputText id="zoneName" className="p-d-block" onChange={(e) => setZone({ ...zone, name: e.target.value })} />
        </div>
        <div className="p-col">
          <label htmlFor="zoneMetric" className="p-d-block">Metragem</label>
          <InputNumber inputId="zoneMetric" value={zone?.metric} onValueChange={(e) => setZone({ ...zone, metric: e.target.value })} suffix=" m²" />
        </div>
        <div className="p-col">
          <label htmlFor="zoneColor" className="p-d-block">Cor</label>
          <ColorPicker value={zone?.color} onChange={(e) => setZone({ ...zone, color: e.value?.toString() })}></ColorPicker>
        </div>
      </div>
    </form>
  );
}

export default CreateZoneComponent;