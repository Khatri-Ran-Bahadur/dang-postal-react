import React from 'react'
import { Content } from "../../components/Common/Content";
const GoogleMap = () => {
  return (
    <div>
      <Content
        style={{ width: "100%" }}
        dangerouslySetInnerHTML={{
          __html: `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1760.7807882110353!2d82.48203526087194!3d28.03787289949742!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3997947a53bcfe21%3A0x108aeb5f2adac692!2sDistrict%20Post%20Office%2C%20Ghorahi%2022400!5e0!3m2!1sen!2snp!4v1594472580693!5m2!1sen!2snp" width="100%" height="450" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>`
        }}
      ></Content>
    </div>
  );
}

export default GoogleMap