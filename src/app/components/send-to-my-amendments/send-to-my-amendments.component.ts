import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/';
import { ToastrService } from 'ngx-toastr';
import { LawAmendmentService } from '../../services/law-amendment/law-amendment.service';
import { LawService } from '../../services/law/law.service';

@Component({
  selector: 'app-send-to-my-amendments',
  templateUrl: './send-to-my-amendments.component.html',
  styleUrls: ['./send-to-my-amendments.component.scss']
})
export class SendToMyAmendmentsComponent implements OnInit {
  modalRef: BsModalRef;
  isSent = false;
  isSubmitted = false;
  id;
  status;
  language;

  constructor(
    public bsModalRef: BsModalRef,
    private toastr: ToastrService,
    private lawAmendmentService: LawAmendmentService,
  ) { }

  ngOnInit() {
  }

  onSend() {
    this.isSubmitted = true;
    this.sentToMyAmendments(this.id);
  }

  sentToMyAmendments(id) {
    this.lawAmendmentService.getLawForAmendment(id, this.language).subscribe((res: any) => {
      this.isSent = true;
      this.status = res.status;
      this.toastr.success('Sent successfully');
      this.bsModalRef.hide();
    }, (error) => {
      error.status === 400 ? this.toastr.warning(error.error.message)
        : this.toastr.error('Something went wrong,try again later');
      this.bsModalRef.hide();
    });
  }
}
